import React, { useState } from "react";
import { getTopTotalScore, getUserTotalScore, getUserLocalScores, getTopScores } from "../service/APICalls";
import { useRecoilState } from "recoil";
import { userIdState, usernameState } from "../recoilState";
import * as styles from "../styles/LeaderboardComponentStyles";

interface TabsProps {
  activeTab: number;
  handleTabClick: (tabIndex: number) => void;
}

interface totalScore {
  userName: string;
  totalScore: number;
}

interface BlitzScore {
  scoreStreak: number;
  scorePoints: number;
  scoreMod: string;
  username: string;
  creationDate: string;
  scoreDifficulty: string;
  scoreOperations: string;
}

const Tabs: React.FC<TabsProps> = ({ activeTab, handleTabClick }) => {
  return (
    <styles.TabsContainer>
      <styles.Tab active={activeTab === 0} onClick={() => handleTabClick(0)}>
        Local Scores<styles.Tooltip>Your local best</styles.Tooltip>
      </styles.Tab>
      <styles.Tab active={activeTab === 1} onClick={() => handleTabClick(1)}>
        Top Scores<styles.Tooltip>Highest score for single play</styles.Tooltip>
      </styles.Tab>
      <styles.Tab active={activeTab === 2} onClick={() => handleTabClick(2)}>
        Total Score<styles.Tooltip>total score</styles.Tooltip>
      </styles.Tab>
    </styles.TabsContainer>
  );
};

const LeaderboardsTable: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [scoreList, setScoreList] = useState<totalScore[]>([]);
  const [userTotalScore, setUserTotalScore] = useState<totalScore>({
    userName: "Guest",
    totalScore: 0,
  });

  const [userLocalScores, setUserLocalScores] = useState<BlitzScore[]>([]);
  const [topScores, setTopScores] = useState<BlitzScore[]>([]);

  const [recoilId] = useRecoilState(userIdState);
  const [recoilName] = useRecoilState(usernameState);

  const handleTabClick = async (tabIndex: number) => {
    setActiveTab(tabIndex);

    if (tabIndex === 0) {
      if (recoilName !== "Guest") {
        const userData = await getUserLocalScores(recoilId);
        setUserLocalScores(userData);
      }
    }

    if (tabIndex === 1) {
      setTopScores(await getTopScores());
    }

    if (tabIndex === 2) {
      setScoreList(await getTopTotalScore());
      if (recoilName !== "Guest") {
        const userData = await getUserTotalScore(recoilId);
        setUserTotalScore(userData);
      }
    }
  };

  return (
    <>
      <styles.TableContainer>
        <Tabs activeTab={activeTab} handleTabClick={handleTabClick} />
        <styles.Divider />
        {activeTab === 0 && (
          <>
            {userLocalScores !== null ? (
              userLocalScores.map((value: BlitzScore, index: number) => {
                return (
                  <styles.ScoreTab>
                    <styles.RankingTabContainer>#{index + 1}</styles.RankingTabContainer>
                    <styles.ScoreTabContainerLeft>
                      <styles.ScoreTabName>{value.username}</styles.ScoreTabName>
                      <styles.ScoreTabName>
                        {value.scorePoints}
                        <styles.SmallerText>pts</styles.SmallerText>(<styles.SmallerCombo>x</styles.SmallerCombo>
                        {value.scoreStreak})<styles.OperationsText>{value.scoreOperations} </styles.OperationsText>
                      </styles.ScoreTabName>
                    </styles.ScoreTabContainerLeft>
                    <styles.ScoreTabContainerRight>
                      <styles.ScoreTabMods>
                        {value.scoreDifficulty}/{value.scoreMod}
                      </styles.ScoreTabMods>
                      <styles.ScoreTabDate>{value.creationDate}</styles.ScoreTabDate>
                    </styles.ScoreTabContainerRight>
                  </styles.ScoreTab>
                );
              })
            ) : (
              <styles.SpinnerWrapper>
                <styles.StyledRingLoader color={"grey"} loading={true} size={50} />
              </styles.SpinnerWrapper>
            )}
          </>
        )}
        {activeTab === 1 && (
          <>
            {topScores !== null ? (
              topScores.map((value: BlitzScore, index: number) => {
                return (
                  <styles.ScoreTab>
                    <styles.RankingTabContainer>#{index + 1}</styles.RankingTabContainer>
                    <styles.ScoreTabContainerLeft>
                      <styles.ScoreTabName>{value.username}</styles.ScoreTabName>
                      <styles.ScoreTabName>
                        {value.scorePoints}
                        <styles.SmallerText>pts</styles.SmallerText>(<styles.SmallerCombo>x</styles.SmallerCombo>
                        {value.scoreStreak})<styles.OperationsText>{value.scoreOperations} </styles.OperationsText>
                      </styles.ScoreTabName>
                    </styles.ScoreTabContainerLeft>
                    <styles.ScoreTabContainerRight>
                      <styles.ScoreTabMods>
                        {value.scoreDifficulty}/{value.scoreMod}
                      </styles.ScoreTabMods>
                      <styles.ScoreTabDate>{value.creationDate}</styles.ScoreTabDate>
                    </styles.ScoreTabContainerRight>
                  </styles.ScoreTab>
                );
              })
            ) : (
              <styles.SpinnerWrapper>
                <styles.StyledRingLoader color={"grey"} loading={true} size={50} />
              </styles.SpinnerWrapper>
            )}
          </>
        )}
        {activeTab === 2 && (
          <>
            {scoreList !== null ? (
              scoreList.map((value: totalScore, index: number) => {
                return (
                  <styles.TotalScoreTab>
                    <styles.RankingTabContainer>#{index + 1}</styles.RankingTabContainer>
                    <styles.TotalScoreTabContainer>
                      <styles.ScoreTabName>{value.userName}</styles.ScoreTabName>
                      <styles.ScoreTabName>
                        {value.totalScore}
                        <styles.SmallerText>pts</styles.SmallerText>
                      </styles.ScoreTabName>
                    </styles.TotalScoreTabContainer>
                  </styles.TotalScoreTab>
                );
              })
            ) : (
              <styles.SpinnerWrapper>
                <styles.StyledRingLoader color={"grey"} loading={true} size={50} />
              </styles.SpinnerWrapper>
            )}
          </>
        )}
      </styles.TableContainer>
      {scoreList !== null && userTotalScore !== null && activeTab === 2 && (
        <styles.UserScoreTab>
          <styles.RankingTabContainer>#</styles.RankingTabContainer>
          <styles.TotalScoreTabContainer>
            <styles.ScoreTabName>{userTotalScore.userName}</styles.ScoreTabName>
            <styles.ScoreTabName>
              {userTotalScore.totalScore}
              <styles.SmallerText>pts</styles.SmallerText>
            </styles.ScoreTabName>
          </styles.TotalScoreTabContainer>
        </styles.UserScoreTab>
      )}
    </>
  );
};

export default LeaderboardsTable;
