import React from "react";
import LoginPrompt from "../components/LoginPrompt";
import * as styles from "../styles/LoginViewStyles";

const LoginView: React.FC = () => {
  return (
    <styles.Container>
      <LoginPrompt />
    </styles.Container>
  );
};

export default LoginView;
