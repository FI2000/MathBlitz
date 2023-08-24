import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../fonts.css";
import { useRecoilState } from "recoil";
import { userIdState, usernameState } from "../recoilState";
import { fetchUserProfile } from "../service/APICalls";
import * as styles from "../styles/LoginPromptStyles";

const LoginPrompt: React.FC = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [recoilId, setRecoilId] = useRecoilState(userIdState);
  const [recoilName, setRecoilName] = useRecoilState(usernameState);

  const [incorrectLogin, setIncorrectLogin] = useState(false);
  const [incorrectLoginFeedback, setIncorrectLoginFeedback] = useState("");

  const handleLogin = async () => {
    const fetchedData = await fetchUserProfile(username, password);

    if (fetchedData === 500) {
      setIncorrectLoginFeedback("Server Error");
      setIncorrectLogin(true);
    } else if (fetchedData === 400) {
      setIncorrectLoginFeedback("Invalid Login");
      setIncorrectLogin(true);
    } else {
      setIncorrectLogin(false);
      setRecoilId(fetchedData["id"]);
      setRecoilName(fetchedData["username"]);
      localStorage.setItem("id", JSON.stringify(fetchedData["id"]));
      localStorage.setItem("username", JSON.stringify(fetchedData["username"]));
      navigate("/");
    }
  };

  const handleRegister = () => {
    navigate("/Register");
  };

  const isButtonDisabled = !username || !password;

  return (
    <styles.PromptContainer>
      <styles.Container>
        <styles.PromptText>Username</styles.PromptText>
        {incorrectLogin && <styles.IncorrectLoginPrompt> {incorrectLoginFeedback} </styles.IncorrectLoginPrompt>}
      </styles.Container>

      <styles.StyledInput type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
      <styles.PromptText>Password</styles.PromptText>
      <styles.StyledInput type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <styles.ButtonContainer>
        <styles.Button onClick={handleRegister}>Register</styles.Button>
        <styles.Button onClick={handleLogin} disabled={isButtonDisabled}>
          Login
        </styles.Button>
      </styles.ButtonContainer>
    </styles.PromptContainer>
  );
};

export default LoginPrompt;
