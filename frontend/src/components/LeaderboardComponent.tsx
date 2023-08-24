import React, { useState } from "react";
import styled from "styled-components";
import { getTopTotalScore, getUserTotalScore, getUserLocalScores, getTopScores } from "../service/APICalls";
import { useRecoilState } from "recoil";
import { userIdState, usernameState } from "../recoilState";
import { RingLoader } from "react-spinners";

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
    <TabsContainer>
      <Tab active={activeTab === 0} onClick={() => handleTabClick(0)}>
        Local Scores<Tooltip>Your local best</Tooltip>
      </Tab>
      <Tab active={activeTab === 1} onClick={() => handleTabClick(1)}>
        Top Scores<Tooltip>Highest score for single play</Tooltip>
      </Tab>
      <Tab active={activeTab === 2} onClick={() => handleTabClick(2)}>
        Total Score<Tooltip>total score</Tooltip>
      </Tab>
    </TabsContainer>
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
      <TableContainer>
        <Tabs activeTab={activeTab} handleTabClick={handleTabClick} />
        <Divider />
        {activeTab === 0 && (
          <>
            {userLocalScores !== null ? (
              userLocalScores.map((value: BlitzScore, index: number) => {
                return (
                  <ScoreTab>
                    <RankingTabContainer>#{index + 1}</RankingTabContainer>
                    <ScoreTabContainerLeft>
                      <ScoreTabName>{value.username}</ScoreTabName>
                      <ScoreTabName>
                        {value.scorePoints}
                        <SmallerText>pts</SmallerText>(<SmallerCombo>x</SmallerCombo>
                        {value.scoreStreak})<OperationsText>{value.scoreOperations} </OperationsText>
                      </ScoreTabName>
                    </ScoreTabContainerLeft>
                    <ScoreTabContainerRight>
                      <ScoreTabMods>
                        {value.scoreDifficulty}/{value.scoreMod}
                      </ScoreTabMods>
                      <ScoreTabDate>{value.creationDate}</ScoreTabDate>
                    </ScoreTabContainerRight>
                  </ScoreTab>
                );
              })
            ) : (
              <SpinnerWrapper>
                <StyledRingLoader color={"grey"} loading={true} size={50} />
              </SpinnerWrapper>
            )}
          </>
        )}
        {activeTab === 1 && (
          <>
            {topScores !== null ? (
              topScores.map((value: BlitzScore, index: number) => {
                return (
                  <ScoreTab>
                    <RankingTabContainer>#{index + 1}</RankingTabContainer>
                    <ScoreTabContainerLeft>
                      <ScoreTabName>{value.username}</ScoreTabName>
                      <ScoreTabName>
                        {value.scorePoints}
                        <SmallerText>pts</SmallerText>(<SmallerCombo>x</SmallerCombo>
                        {value.scoreStreak})<OperationsText>{value.scoreOperations} </OperationsText>
                      </ScoreTabName>
                    </ScoreTabContainerLeft>
                    <ScoreTabContainerRight>
                      <ScoreTabMods>
                        {value.scoreDifficulty}/{value.scoreMod}
                      </ScoreTabMods>
                      <ScoreTabDate>{value.creationDate}</ScoreTabDate>
                    </ScoreTabContainerRight>
                  </ScoreTab>
                );
              })
            ) : (
              <SpinnerWrapper>
                <StyledRingLoader color={"grey"} loading={true} size={50} />
              </SpinnerWrapper>
            )}
          </>
        )}
        {activeTab === 2 && (
          <>
            {scoreList !== null ? (
              scoreList.map((value: totalScore, index: number) => {
                return (
                  <TotalScoreTab>
                    <RankingTabContainer>#{index + 1}</RankingTabContainer>
                    <TotalScoreTabContainer>
                      <ScoreTabName>{value.userName}</ScoreTabName>
                      <ScoreTabName>
                        {value.totalScore}
                        <SmallerText>pts</SmallerText>
                      </ScoreTabName>
                    </TotalScoreTabContainer>
                  </TotalScoreTab>
                );
              })
            ) : (
              <SpinnerWrapper>
                <StyledRingLoader color={"grey"} loading={true} size={50} />
              </SpinnerWrapper>
            )}
          </>
        )}
      </TableContainer>
      {scoreList !== null && userTotalScore !== null && activeTab === 2 && (
        <UserScoreTab>
          <RankingTabContainer>#</RankingTabContainer>
          <TotalScoreTabContainer>
            <ScoreTabName>{userTotalScore.userName}</ScoreTabName>
            <ScoreTabName>
              {userTotalScore.totalScore}
              <SmallerText>pts</SmallerText>
            </ScoreTabName>
          </TotalScoreTabContainer>
        </UserScoreTab>
      )}
    </>
  );
};

const StyledRingLoader = styled(RingLoader)`
  /* Your custom styles for the spinner */
`;

const SpinnerWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 30vh;
`;

const TabsContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ScoreTab = styled.div`
  display: flex;
  height: 3.1rem;
  color: black;
  border-bottom: 1px solid grey;
  justify-content: space-between;
`;
const ScoreTabContainerLeft = styled.div`
  display: flex;
  width: 60%;
  flex-direction: column;
  justify-content: space-between;
`;

const TotalScoreTab = styled.div`
  display: flex;
  height: 3rem;
  color: black;
  border-bottom: 1px solid grey;
  opacity: 0.9;

  background-color: white;

  &:hover {
    background-color: lightgrey;
  }
`;

const UserScoreTab = styled.div`
  display: flex;
  height: 3rem;
  color: coral;
  border-bottom: 1px solid grey;
  opacity: 0.9;

  background-color: black;
`;

const TotalScoreTabContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
`;

const RankingTabContainer = styled.div`
  display: flex;
  width: 15%;
  justify-content: center;
  align-items: center;
  font-size: 20px;
`;

const SmallerText = styled.span`
  font-size: 9px;
  color: grey;
  margin-left: 3px;
`;

const OperationsText = styled.span`
  font-size: 12px;
  color: grey;
`;

const SmallerCombo = styled.span`
  font-size: 12px;
  margin-left: 3px;
`;

const ScoreTabContainerRight = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  width: 30%;
  flex-direction: column;
  justify-content: space-between;
`;

const ScoreTabName = styled.div`
  font-size: 18px;
  padding-left: 4px;
`;
const ScoreTabDate = styled.div`
  font-weight: 50;
  color: grey;
`;

const ScoreTabMods = styled.div`
  font-size: 12px;
  padding-left: 4px;
`;

const Divider = styled.div`
  height: 2px;
  background-color: black;
`;

const Tab = styled.div<{ active: boolean }>`
  position: relative;
  padding: 10px 20px;
  cursor: pointer;
  background-color: white;
  transition: background-color 0.3s ease-in-out;
  border-radius: 10px;
  color: ${(props) => (props.active ? "coral" : "black")};
  &:hover {
    span {
      visibility: visible;
      margin-left: 5%;
    }
  }
`;

const Tooltip = styled.span`
  position: absolute;
  top: -25px;
  left: 50%;
  transform: translateX(-50%);
  background-color: rgba(0, 0, 0, 0.1); /* Adjust the alpha value to control transparency */
  color: grey;
  padding: 5px;
  border-radius: 4px;
  white-space: nowrap;
  visibility: hidden;
`;
const TableContainer = styled.div`
  max-height: 528.1px;
  overflow-y: auto; /* Enable vertical scrolling when content exceeds container height */
  overflow-x: hidden;

  /* Hide the original scrollbar */
  &::-webkit-scrollbar {
    width: 0;
    height: 0;
  }

  /* Styling the scrollbar thumb */
  &::-webkit-scrollbar-thumb {
    background-color: #888; /* thumb color */
  }

  /* Styling the scrollbar track */
  &::-webkit-scrollbar-track {
    background-color: #f0f0f0; /* track color */
  }
`;

export default LeaderboardsTable;
