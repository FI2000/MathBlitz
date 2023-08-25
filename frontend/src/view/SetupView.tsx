import React, { useState } from "react";
import { useRecoilState } from "recoil";
import { usernameState } from "../recoilState";
import { useNavigate } from "react-router-dom";
import * as styles from "../styles/SetupViewStyles";
import { calculateMultiplier } from "../service/BlitzGenerator";

interface BlitzParameters {
  mod: string | null;
  difficulty: string | null;
  operations: string | null;
  multiplier: number;
}

const SetupView: React.FC = () => {
  const [recoilName] = useRecoilState(usernameState);
  const navigate = useNavigate();

  const [mod, setMod] = useState<string | null>(null);
  const [difficulty, setDifficulty] = useState<string | null>(null);
  const [operations, setOperation] = useState<string | null>(null);
  var multiplier = 1.0 * calculateMultiplier(mod) * calculateMultiplier(difficulty) * calculateMultiplier(operations);

  const handleNavigation = () => {
    const data: BlitzParameters = {
      mod: mod,
      difficulty: difficulty,
      operations: operations,
      multiplier: multiplier,
    };
    navigate("/Blitz", { state: data });
  };

  const cannotStart = mod !== null && difficulty !== null && operations !== null;

  return (
    <>
      <styles.CC>
        <styles.Modes>
          <styles.TitleMode>
            <styles.PromptText>Blitz</styles.PromptText>
          </styles.TitleMode>
          <styles.ParameterContainer>
            <styles.SmallText>Mods</styles.SmallText>
            <styles.ButtonGroupContainer>
              <styles.Button
                onClick={() => setMod("None")}
                style={mod === "None" ? { backgroundColor: " black" } : { backgroundColor: " white" }}
              >
                None
              </styles.Button>
              <styles.Button
                onClick={() => setMod("Memory")}
                style={mod === "Memory" ? { backgroundColor: " black" } : { backgroundColor: " white" }}
              >
                Memory
              </styles.Button>
              <styles.Button
                onClick={() => setMod("PeekABoo")}
                style={mod === "PeekABoo" ? { backgroundColor: " black" } : { backgroundColor: " white" }}
              >
                Peek-A-Boo
              </styles.Button>
            </styles.ButtonGroupContainer>
          </styles.ParameterContainer>
          <styles.ParameterContainer>
            <styles.SmallText>Difficulty</styles.SmallText>
            <styles.ButtonGroupContainer>
              <styles.Button
                onClick={() => setDifficulty("Normal")}
                style={difficulty === "Normal" ? { backgroundColor: " black" } : { backgroundColor: " white" }}
              >
                Normal
              </styles.Button>
              <styles.Button
                onClick={() => setDifficulty("Hard")}
                style={difficulty === "Hard" ? { backgroundColor: " black" } : { backgroundColor: " white" }}
              >
                Hard
              </styles.Button>
              <styles.Button
                onClick={() => setDifficulty("Extreme")}
                style={difficulty === "Extreme" ? { backgroundColor: " black" } : { backgroundColor: " white" }}
              >
                Extreme
              </styles.Button>
            </styles.ButtonGroupContainer>
          </styles.ParameterContainer>
          <styles.ParameterContainer>
            <styles.SmallText>Operations</styles.SmallText>
            <styles.ButtonGroupContainer>
              <styles.Button
                onClick={() => setOperation("Basic")}
                style={operations === "Basic" ? { backgroundColor: " black" } : { backgroundColor: " white" }}
              >
                Basic
              </styles.Button>
              <styles.Button
                onClick={() => setOperation("Advanced")}
                style={operations === "Advanced" ? { backgroundColor: " black" } : { backgroundColor: " white" }}
              >
                Advanced
              </styles.Button>
            </styles.ButtonGroupContainer>
          </styles.ParameterContainer>
          <styles.ScoreMultiplier>x({multiplier.toFixed(1)}) </styles.ScoreMultiplier>
          <styles.StartButton disabled={!cannotStart} onClick={handleNavigation}>
            Start
          </styles.StartButton>
        </styles.Modes>
      </styles.CC>
    </>
  );
};

export default SetupView;
