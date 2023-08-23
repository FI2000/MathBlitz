import React from "react";
import LoginPrompt from "../components/LoginPrompt";
import styled from "styled-components";
import RegisterPrompt from "../components/RegisterPrompt";

const RegisterView: React.FC = () => {
  return (
    <Container>
      <RegisterPrompt />
    </Container>
  );
};

const Container = styled.div`
  display: inline-flex;
  justify-content: space-evenly;
  align-items: center;
  background-color: #f0f0f0;
  border: 4px solid black;
  border-radius: 15px;
  margin-left: 40%;
  margin-top: 10%;
`;
export default RegisterView;
