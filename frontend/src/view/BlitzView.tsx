import React from "react";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import BlitzComponent from "../components/BlitzComponent";

interface BlitzParameters {
  mod: string | null;
  difficulty: string | null;
  operations: string | null;
  multiplier: number;
}

const BlitzView: React.FC = () => {
  const location = useLocation();
  const parameters = location.state as BlitzParameters;

  console.log(parameters);
  return (
    <>
      <Container>
        <BlitzComponent
          mod={parameters.mod}
          difficulty={parameters.difficulty}
          operations={parameters.operations}
          multiplier={parameters.multiplier}
        />
      </Container>
    </>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 3rem;
  margin-left: 4rem;
  flex-direction: column;
  max-width: 1650px;
`;

export default BlitzView;
