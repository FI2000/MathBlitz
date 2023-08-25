import React, { useState, useEffect } from "react";
import { generateEquation, getInitialTimer, getMinimalTimer, getPlayerLives } from "../service/BlitzGenerator";
import { useRecoilState } from "recoil";
import { userIdState, usernameState } from "../recoilState";
import { playCorrect } from "../service/AudioSounds";
import { playWrong } from "../service/AudioSounds";
import { submitUserScore } from "../service/APICalls";
import Countdown from "./CountdownComponent";
import LeaderboardsTable from "./LeaderboardComponent";
import * as styles from "../styles/BlitzComponentStyles";

interface BlitzParameters {
  mod: string | null;
  difficulty: string | null;
  operations: string | null;
  multiplier: number;
}

interface BlitzRound {
  equation: string;
  options: number[];
  answer: number;
}

interface BlitzScore {
  scoreStreak: number;
  scorePoints: number;
  scoreMod: string | null;
  userId: number | null;
  username: string | null;
  scoreDifficulty: string | null;
  scoreOperations: string | null;
}

const BlitzComponent: React.FC<BlitzParameters> = ({ mod, difficulty, operations, multiplier }) => {
  const [recoilId, setRecoilId] = useRecoilState(userIdState);
  const [recoilName, setRecoilName] = useRecoilState(usernameState);

  const initialTimerValue = getInitialTimer(difficulty, operations) || 15;
  const minimalTimerValue = getMinimalTimer(difficulty, operations) || 5;
  const playerLives = getPlayerLives(difficulty, operations) || 3;

  const [score, setScore] = useState<number>(0);
  const [streak, setStreak] = useState<number>(1);
  const [maxStreak, setMaxStreak] = useState<number>(1);
  const [lives, setLives] = useState<number>(playerLives);
  const [equation, setEquation] = useState<string | null>(null);
  const [options, setOptions] = useState<number[]>([]);
  const [answer, setAnswer] = useState<number>(0);
  const [guessing, setGuessing] = useState(false);
  const [feedback, setFeedback] = useState("-");
  const [textVisible, setTextVisible] = useState(true);

  const [timer, setTimer] = useState(initialTimerValue);
  const [remainingSeconds, setRemainingSeconds] = useState(0);
  const [timeoutId, setTimeoutId] = useState<number | undefined>(undefined);

  const handleCountdownComplete = () => {
    playWrong();
    setFeedback("Wrong...");
    setGuessing(false);
    setStreak(1);
    setLives(lives - 1);
    setTextVisible(true);
    setTimer(initialTimerValue);
    window.clearTimeout(timeoutId);
  };

  const handleRound = () => {
    setFeedback("-");
    setGuessing(true);

    const id: number = window.setTimeout(() => {
      setTextVisible(false);
    }, Math.ceil(timer * 0.44) * 1000);
    setTimeoutId(id);

    const round: BlitzRound = generateEquation(difficulty, operations);
    setEquation(round.equation);
    setOptions(round.options);
    setAnswer(round.answer);
  };

  const handleReset = () => {
    setScore(0);
    setStreak(1);
    setMaxStreak(1);
    setLives(3);
    setEquation("");
    setOptions([]);
    setAnswer(0);
    setFeedback("-");
    setTextVisible(true);
    setTimer(initialTimerValue);
    window.clearTimeout(timeoutId);
  };

  const handleAnswer = (chosen: number) => {
    let timeTaken = timer - remainingSeconds;
    setTextVisible(true);
    setGuessing(false);
    window.clearTimeout(timeoutId);
    if (answer === chosen) {
      playCorrect();
      setScore(Math.ceil(score + streak * 100 * multiplier - 10 * timeTaken));
      setMaxStreak(Math.max(maxStreak, streak + 1));
      setStreak(streak + 1);

      if (streak % 3 == 0 && streak !== 0 && streak < 20) {
        setTimer(Math.max(Math.floor(timer - streak / 3), minimalTimerValue));
        setFeedback("Timer shortened");
      } else {
        setFeedback("Correct!");
      }
    } else {
      playWrong();
      setStreak(1);
      setLives(lives - 1);
      setFeedback("Wrong...");
      setTimer(initialTimerValue);
    }
  };

  const handleSubmit = async () => {
    const submittedScore: BlitzScore = {
      scoreStreak: maxStreak,
      scorePoints: score,
      scoreMod: mod,
      userId: recoilId,
      username: recoilName,
      scoreDifficulty: difficulty,
      scoreOperations: operations,
    };
    const statusCode = await submitUserScore(submittedScore);
    if (statusCode === 200) {
      handleReset();
    }
  };

  const handleTick = (seconds: number) => {
    setRemainingSeconds(seconds);
  };

  return (
    <styles.GridContainer>
      <styles.PageContainer>
        <styles.BlitzInfoContainer>
          <styles.PromptText>
            Total Score(x{multiplier.toFixed(1)}): {score}
          </styles.PromptText>
          <styles.PromptText>
            Streak: {streak}/{maxStreak}
          </styles.PromptText>
        </styles.BlitzInfoContainer>
        <styles.BlitzGameContainer>
          <styles.EquationContainer>
            <p>Equation</p>
            <p>{equation}</p>
          </styles.EquationContainer>
          <styles.ButtonGroupContainer>
            {options.map((item, index) =>
              mod === "PeekABoo" ? (
                <styles.PeekABooButton key={index} onClick={() => handleAnswer(item)} disabled={!guessing}>
                  {item}
                </styles.PeekABooButton>
              ) : mod === "Memory" ? (
                <styles.Button key={index} onClick={() => handleAnswer(item)} disabled={!guessing}>
                  {textVisible ? item : "?"}
                </styles.Button>
              ) : (
                <styles.Button key={index} onClick={() => handleAnswer(item)} disabled={!guessing}>
                  {item}
                </styles.Button>
              )
            )}
          </styles.ButtonGroupContainer>
        </styles.BlitzGameContainer>
        <styles.FooterContainer>
          <styles.PromptText>Lives:{lives}</styles.PromptText>
          {!guessing && lives > 0 && <styles.StartButton onClick={() => handleRound()}> Blitz </styles.StartButton>}
          {lives == 0 && (
            <styles.SubmitButton onClick={handleSubmit} disabled={recoilId === null}>
              Submit {recoilId === null && <styles.DisabledText>Log in</styles.DisabledText>}
            </styles.SubmitButton>
          )}
        </styles.FooterContainer>
        <styles.FeedbackContainer>
          {lives > 0 &&
            (guessing ? (
              <Countdown initialSeconds={timer} onComplete={handleCountdownComplete} onTick={handleTick} />
            ) : (
              <styles.FeedbackText content={feedback}>{feedback}</styles.FeedbackText>
            ))}
          {lives == 0 && <styles.ResetButton onClick={handleReset}> Reset </styles.ResetButton>}
        </styles.FeedbackContainer>
      </styles.PageContainer>
      <styles.LeaderboardsContainer>
        <LeaderboardsTable></LeaderboardsTable>
      </styles.LeaderboardsContainer>
    </styles.GridContainer>
  );
};

export default BlitzComponent;
