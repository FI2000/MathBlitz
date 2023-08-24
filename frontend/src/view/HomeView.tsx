import React from "react";
import * as styles from "../styles/HomeViewStyles";

const Homeview: React.FC = () => {
  return (
    <>
      <styles.Container>
        <styles.PromptTitleText>How to play</styles.PromptTitleText>
        <br />
        <styles.PromptText>
          This site hosts a mini game that consists of calculating the answer to a random equation that pops on your screen while racing
          against a timer. You have three lives in total, each wrong guess removes one. The timer becomes shorter and shorter as you build
          your streak, which is the number of right guesses in a row. I call these games 'Blitzes'. (Tip: Higher Streak = More Score!)
        </styles.PromptText>
        <br />
        <styles.PromptText>
          You can also mod your Blitz with two modifications: Memory and Peek-A-Boo. The former hides the answers after a certain duration ,
          promoting (you guessed it) a strong memory, while the latter hides the answers from the get-go until you hover on each one to
          temporarily show it. (Tip: Mods = More Score!).
        </styles.PromptText>
        <br />
        <styles.PromptText>
          This site follows the made-up MAS order of operation (From left to right, Multiplication into Addition/Substraction). There are
          two settings : Difficulty and Operations. A Higher difficulty means more operands and more answers to choose from. Basic
          operations include addition and substraction, while advanced includes multiplication. (Tip: Higher Difficulty = More Score!)
        </styles.PromptText>
        <br />
        <styles.PromptText>
          Start playing by clicking on Blitz on the top navbar! (You can return to this page by clicking on the Math Blitz logo).
        </styles.PromptText>
        <br />
        <styles.PromptText>!!! -- If mods seem to be broken, empty cache by hard reloading!</styles.PromptText>
      </styles.Container>
    </>
  );
};

export default Homeview;
