import styled from "styled-components";

export const PromptText = styled.div`
  font-family: "PixelFont", cursive;
  font-weight: bold;
  font-size: 24px;
  margin-bottom: 12px;
`;

export const PageContainer = styled.div`
  font-family: "PixelFont", cursive;
  font-weight: bold;
  font-size: 32px;
`;

export const LeaderboardsContainer = styled.div`
  font-family: "PixelFont", cursive;
  font-weight: bold;
  font-size: 13px;
  border: 2px solid black;
  margin-left: 40px;
  margin-right: 10px;
  border-image: linear-gradient(to bottom, black, transparent);
  border-image-slice: 1;
`;

export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 10px;
`;

export const EquationContainer = styled.div`
  font-family: "PixelFont", cursive;
  font-weight: bold;
  font-size: 32px;
  margin-bottom: 12px;
  text-align: center;
  flex-direction: column;
`;

export const BlitzInfoContainer = styled.div`
  display: flex;
  margin-left: 4rem;
  flex-direction: column;
  text-align: left;
`;

export const BlitzGameContainer = styled.div`
  display: flex;
  margin-left: 4rem;
  height: 17rem;
  flex-direction: column;
  text-align: left;
`;
export const FooterContainer = styled.div`
  display: flex;
  height: 90px;
  margin-left: 4rem;
  justify-content: space-between;
  align-items: center;
`;

export const FeedbackContainer = styled.div`
  display: flex;
  height: 90px;
  margin-left: 4rem;
  justify-content: center;
  align-items: center;
  font-family: "PixelFont", cursive;
  font-weight: bold;
  font-size: 32px;
`;
export const FeedbackText = styled.p`
  color: ${(props) => (props.content === "Correct!" ? "green" : props.content === "Wrong..." ? "red" : "black")};
`;

export const ButtonGroupContainer = styled.div`
  display: flex;
  gap: 40px;
  justify-content: center;
  margin-top: 1rem;
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
  font-size: 32px;

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

export const PeekABooButton = styled.button`
  background-color: white;
  color: white;
  border: none;
  padding: 10px 20px;
  margin-top: 0px;
  border-radius: 5px;
  cursor: pointer;
  font-family: "PixelFont", cursive;
  font-size: 32px;

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
        `};
`;

export const StartButton = styled.button`
  background-color: white;
  color: coral;
  border: none;
  padding: 10px 20px;

  border-radius: 5px;
  cursor: pointer;
  font-family: "PixelFont", cursive;
  font-size: 24px;
  width: 155px;
  height: 70px;
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

export const ResetButton = styled.button`
  background-color: white;
  color: coral;
  border: none;
  padding: 10px 20px;

  border-radius: 5px;
  cursor: pointer;
  font-family: "PixelFont", cursive;
  font-size: 24px;
  width: 155px;
  height: 70px;
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

export const SubmitButton = styled.button`
  background-color: white;
  color: coral;
  border: none;
  padding: 10px 20px;

  border-radius: 5px;
  font-family: "PixelFont", cursive;
  font-size: 24px;
  width: 155px;
  height: 70px;
  text-align: center;

  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  opacity: ${(props) => (props.disabled ? 0.6 : 1)};

  transition: background-color 0.3s ease-in-out;
  &:hover {
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

    span {
      visibility: visible;
      margin-left: 5%;
    }
  }
`;

export const DisabledText = styled.span`
  margin-left: 60%;
  color: black;
  font-size: 14px;
  font-weight: bold;
  visibility: hidden;
`;
