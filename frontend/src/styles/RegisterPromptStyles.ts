import styled from "styled-components";

export const PromptText = styled.div`
  font-family: "PixelFont", cursive;
  font-weight: bold;
  font-size: 18px;
`;
export const StyledInput = styled.input`
  width: 93%;
  padding: 10px;
  margin: 5px 0;
  border-radius: 5px;
  border: none;
`;

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const IncorrectLoginPrompt = styled.div`
  font-family: "PixelFont", cursive;
  font-weight: bold;
  font-size: 10px;
  align-self: flex-end;
  color: black;
`;

export const Button = styled.button`
  background-color: white;
  color: coral;
  border: none;
  padding: 10px 20px;
  margin-top: 10px;
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
export const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
  justify-content: flex-end;
`;

export const PromptContainer = styled.div`
  background-color: coral;
  color: white;
  padding: 20px;
  border-radius: 10px;
  width: 300px;
  flex-direction: column;
  align-items: left;
`;
