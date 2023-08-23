import React from "react";
import * as styles from "../styles/AboutViewStyles";

const AboutView: React.FC = () => {
  return (
    <>
      <styles.Container>
        <styles.PromptText>
          This is a non-commercial small project I decided to do simply to learn about Frontend development with Typescript and React and
          Backend development with a Spring boot java server and a Postgre Persistence.
        </styles.PromptText>

        <br />
        <styles.PromptText>
          I also wanted to learn how to manage hosting a website and how it connects to the server and database. Its something i haven't
          done before
        </styles.PromptText>
      </styles.Container>
    </>
  );
};

export default AboutView;
