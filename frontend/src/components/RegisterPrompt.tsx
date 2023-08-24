import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import "../fonts.css";
import { registerUserProfile } from "../service/APICalls";

const RegisterPrompt: React.FC = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [incorrectUsername, setIncorrectUsername] = useState(false);
  const [incorrectUsernameFeedback, setIncorrectUsernameFeedback] = useState("");

  const handleRegister = async () => {
    if (username.length >= 3 && username.length <= 12) {
      const status = await registerUserProfile(username, password);
      if (status === 200) {
        navigate("/Login");
      } else if (status === 500) {
        setIncorrectUsernameFeedback("Server Error");
        setIncorrectUsername(true);
      } else if (status === 400) {
        setIncorrectUsernameFeedback("Username taken");
        setIncorrectUsername(true);
      } else if (status === 401) {
        setIncorrectUsernameFeedback("Inappropriate name");
        setIncorrectUsername(true);
      }
    } else {
      setIncorrectUsernameFeedback("Invalid Length");
      setIncorrectUsername(true);
    }
  };

  const isButtonDisabled = !username || !password;

  return (
    <PromptContainer>
      <Container>
        <PromptText>Username</PromptText>
        {incorrectUsername && <IncorrectLoginPrompt> {incorrectUsernameFeedback} </IncorrectLoginPrompt>}
      </Container>
      <StyledInput type="text" placeholder="Username (3-12 characters)" value={username} onChange={(e) => setUsername(e.target.value)} />
      <PromptText>Password</PromptText>
      <StyledInput type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <ButtonContainer>
        <Button onClick={handleRegister} disabled={isButtonDisabled}>
          Register
        </Button>
      </ButtonContainer>
    </PromptContainer>
  );
};

const PromptText = styled.div`
  font-family: "PixelFont", cursive;
  font-weight: bold;
  font-size: 18px;
`;
const StyledInput = styled.input`
  width: 93%;
  padding: 10px;
  margin: 5px 0;
  border-radius: 5px;
  border: none;
`;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
`;

const IncorrectLoginPrompt = styled.div`
  font-family: "PixelFont", cursive;
  font-weight: bold;
  font-size: 10px;
  align-self: flex-end;
  color: black;
`;

const Button = styled.button`
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
const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
  justify-content: flex-end;
`;

const PromptContainer = styled.div`
  background-color: coral;
  color: white;
  padding: 20px;
  border-radius: 10px;
  width: 300px;
  flex-direction: column;
  align-items: left;
`;

export default RegisterPrompt;
