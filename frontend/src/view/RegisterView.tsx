import React from "react";
import RegisterPrompt from "../components/RegisterPrompt";
import * as styles from "../styles/RegisterViewStyles";

const RegisterView: React.FC = () => {
  return (
    <styles.Container>
      <RegisterPrompt />
    </styles.Container>
  );
};

export default RegisterView;
