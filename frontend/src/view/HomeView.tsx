import React from "react";
import styled from "styled-components";

const Homeview: React.FC = () => {
  return (
    <>
      <Container>
        <PromptTitleText>How to play</PromptTitleText>
        <br />
        <PromptText>
          This site hosts a mini game that consists of calculating the answer to a random equation that pops on your screen while racing
          against a timer. You have three lives in total, each wrong guess removes one. The timer becomes shorter and shorter as you build
          your streak, which is the number of right guesses in a row. I call these games 'Blitzes'. (Tip: Higher Streak = More Score!)
        </PromptText>
        <br />
        <PromptText>
          You can also mod your Blitz with two modifications: Memory and Peek-A-Boo. The former hides the answers after a certain duration ,
          promoting (you guessed it) a strong memory, while the latter hides the answers from the get-go until you hover on each one to
          temporarily show it. (Tip: Mods = More Score!).
        </PromptText>
        <br />
        <PromptText>
          This site follows the made-up MAS order of operation (From left to right, Multiplication into Addition/Substraction). There are
          two settings : Difficulty and Operations. A Higher difficulty means more operands and more answers to choose from. Basic
          operations include addition and substraction, while advanced includes multiplication. (Tip: Higher Difficulty = More Score!)
        </PromptText>
        <br />
        <PromptText>
          Start playing by clicking on Blitz on the top navbar! (You can return to this page by clicking on the Math Blitz logo).
        </PromptText>
        <br />
        <PromptText>!!! -- If mods seem to be broken, empty cache by hard reloading!</PromptText>
      </Container>
    </>
  );
};

const PromptText = styled.div`
  font-family: "PixelFont", cursive;
  font-weight: bold;
  font-size: 18px;
`;
const PromptTitleText = styled.div`
  font-family: "PixelFont", cursive;
  font-weight: bold;
  font-size: 32px;
`;
const Container = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 6rem;
  margin-left: 4rem;
  flex-direction: column;
  max-width: 1200px;
`;

export default Homeview;
