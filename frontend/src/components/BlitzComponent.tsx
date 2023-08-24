import React, { useState, useEffect } from "react";
import { normalDifficultyEquation } from "../service/BlitzGenerator";
import Countdown from "react-countdown";
import { useRecoilState } from "recoil";
import { userIdState, usernameState } from "../recoilState";
import { playCorrect } from "../service/AudioSounds";
import { playWrong } from "../service/AudioSounds";
import { submitUserScore } from "../service/APICalls";
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

  const [score, setScore] = useState<number>(0);
  const [streak, setStreak] = useState<number>(1);
  const [maxStreak, setMaxStreak] = useState<number>(1);
  const [lives, setLives] = useState<number>(3);
  const [equation, setEquation] = useState<string | null>(null);
  const [options, setOptions] = useState<number[]>([]);
  const [answer, setAnswer] = useState<number>(0);

  const [guessing, setGuessing] = useState(false);
  const [startCountdown, setStartCountdown] = useState(false);
  const [feedback, setFeedback] = useState("-");
  const [guessingDuration, setGuessingDuration] = useState(15);
  const [textVisible, setTextVisible] = useState(true);

  const handleCountdownComplete = () => {
    playWrong();
    setFeedback("Welp");
    setGuessing(false);
    setStartCountdown(false);
    setStreak(1);
    setLives(lives - 1);
    setTextVisible(true);
  };

  const handleRound = () => {
    setGuessingDuration(Date.now() + 15000 - Math.min(Math.floor(streak * 0.5) * 1000, 10000));

    setTimeout(() => {
      setTextVisible(false);
    }, (15000 - Math.min(Math.floor(streak * 0.5) * 1000, 10000)) * 0.4);
    setGuessing(true);
    setStartCountdown(true);
    setFeedback("-");

    const round: BlitzRound = normalDifficultyEquation();
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
    setGuessingDuration(15);
  };

  const handleAnswer = (chosen: number) => {
    setTextVisible(true);
    let timeTaken = Math.floor((15000 - Math.floor(streak * 0.1) * 1000 - (guessingDuration - Date.now())) / 1000);
    setGuessing(false);
    setStartCountdown(false);

    if (answer === chosen) {
      playCorrect();
      setScore(Math.ceil(score + streak * 100 * multiplier - 10 * timeTaken));
      setMaxStreak(Math.max(maxStreak, streak + 1));
      setStreak(streak + 1);
      if (streak % 2 == 0 && streak !== 0 && streak < 20) {
        setFeedback("Timer shortened");
      } else {
        setFeedback("Nice");
      }
    } else {
      playWrong();
      setStreak(1);
      setLives(lives - 1);
      setFeedback("Welp");
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

  const renderSeconds = ({ seconds }: any) => {
    return <span>{seconds}</span>;
  };

  return (
    <styles.GridContainer>
      <styles.PageContainer>
        <styles.BlitzInfoContainer>
          <styles.PromptText>
            Total Score(x{multiplier.toFixed(2)}): {score}
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
              <Countdown date={guessingDuration} renderer={renderSeconds} onComplete={handleCountdownComplete} />
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
