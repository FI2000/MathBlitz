import styled from "styled-components";

export const ButtonGroupContainer = styled.div`
  display: flex;
  gap: 0px;
  justify-content: center;
  margin-top: 1rem;
`;
export const ScoreMultiplier = styled.div`
  font-family: "PixelFont", cursive;
  font-weight: bold;
  font-size: 12px;
  text-align: center;
  margin-bottom: 10px;
`;

export const StartButton = styled.button`
  background-color: black;
  color: coral;
  border: none;
  padding: 10px 20px;
  margin-left: 30%;

  border-radius: 5px;
  cursor: pointer;
  font-family: "PixelFont", cursive;
  font-size: 24px;
  width: 155px;
  text-align: center;

  ${({ disabled }) =>
    disabled
      ? `
        color: grey;
        opacity: 0.6;
        cursor: not-allowed;
    `
      : `
        transition: background-color 0.3s ease-in-out;
        &:hover {
            background-color: black;
        }
    `}
`;

export const Button = styled.button`
  background-color: white;
  color: coral;
  border: none;
  padding: 10px 20px;
  margin-top: 0px;
  border-radius: 5px;
  cursor: pointer;
  font-family: "PixelFont", cursive;

  ${({ disabled }) =>
    disabled
      ? `
            color: grey;
            opacity: 0.6;
            cursor: not-allowed;
        `
      : `
            transition: background-color 0.3s ease-in-out;
            &:hover {
                background-color: black;
            }
        `}
`;

export const TitleMode = styled.div`
  text-align: center;
  padding-top: 15px;
  width: 400px;
  height: 60px;
`;

export const SmallText = styled.div`
  font-family: "PixelFont", cursive;
  font-weight: bold;
  font-size: 16px;
`;
export const ParameterContainer = styled.div`
  text-align: center;
  padding-top: 15px;
  width: 400px;
  height: 120px;
`;

export const PromptText = styled.div`
  font-family: "PixelFont", cursive;
  font-weight: bold;
  font-size: 24px;
`;
export const CC = styled.div`
  justify-content: center;
  display: flex;

  max-width: 600px;
  margin-top: 1rem;
  margin-left: 32.2%;
  height: 70vh;
  border: 3px solid;
  border-image: linear-gradient(to bottom, #ccc, transparent);
  border-image-slice: 1;
`;

export const Modes = styled.div`
  display: flex;
  width: 400px;
  flex-direction: column;
`;
