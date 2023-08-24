import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../fonts.css";
import { registerUserProfile } from "../service/APICalls";
import * as styles from "../styles/RegisterPromptStyles";

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
    <styles.PromptContainer>
      <styles.Container>
        <styles.PromptText>Username</styles.PromptText>
        {incorrectUsername && <styles.IncorrectLoginPrompt> {incorrectUsernameFeedback} </styles.IncorrectLoginPrompt>}
      </styles.Container>
      <styles.StyledInput
        type="text"
        placeholder="Username (3-12 characters)"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <styles.PromptText>Password</styles.PromptText>
      <styles.StyledInput type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <styles.ButtonContainer>
        <styles.Button onClick={handleRegister} disabled={isButtonDisabled}>
          Register
        </styles.Button>
      </styles.ButtonContainer>
    </styles.PromptContainer>
  );
};

export default RegisterPrompt;
