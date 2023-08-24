import React from "react";
import { useLocation } from "react-router-dom";
import BlitzComponent from "../components/BlitzComponent";
import * as styles from "../styles/BlitzViewStyles";

interface BlitzParameters {
  mod: string | null;
  difficulty: string | null;
  operations: string | null;
  multiplier: number;
}

const BlitzView: React.FC = () => {
  const location = useLocation();
  const parameters = location.state as BlitzParameters;
  return (
    <>
      <styles.Container>
        <BlitzComponent
          mod={parameters.mod}
          difficulty={parameters.difficulty}
          operations={parameters.operations}
          multiplier={parameters.multiplier}
        />
      </styles.Container>
    </>
  );
};

export default BlitzView;
