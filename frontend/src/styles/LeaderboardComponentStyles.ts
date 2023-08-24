import styled from "styled-components";
import { RingLoader } from "react-spinners";

export const StyledRingLoader = styled(RingLoader)`
  /* Your custom styles for the spinner */
`;

export const SpinnerWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 30vh;
`;

export const TabsContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const ScoreTab = styled.div`
  display: flex;
  height: 3.1rem;
  color: black;
  border-bottom: 1px solid grey;
  justify-content: space-between;
`;
export const ScoreTabContainerLeft = styled.div`
  display: flex;
  width: 60%;
  flex-direction: column;
  justify-content: space-between;
`;

export const TotalScoreTab = styled.div`
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

export const UserScoreTab = styled.div`
  display: flex;
  height: 3rem;
  color: coral;
  border-bottom: 1px solid grey;
  opacity: 0.9;

  background-color: black;
`;

export const TotalScoreTabContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
`;

export const RankingTabContainer = styled.div`
  display: flex;
  width: 15%;
  justify-content: center;
  align-items: center;
  font-size: 20px;
`;

export const SmallerText = styled.span`
  font-size: 9px;
  color: grey;
  margin-left: 3px;
`;

export const OperationsText = styled.span`
  font-size: 12px;
  color: grey;
`;

export const SmallerCombo = styled.span`
  font-size: 12px;
  margin-left: 3px;
`;

export const ScoreTabContainerRight = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  width: 30%;
  flex-direction: column;
  justify-content: space-between;
`;

export const ScoreTabName = styled.div`
  font-size: 18px;
  padding-left: 4px;
`;
export const ScoreTabDate = styled.div`
  font-weight: 50;
  color: grey;
`;

export const ScoreTabMods = styled.div`
  font-size: 12px;
  padding-left: 4px;
`;

export const Divider = styled.div`
  height: 2px;
  background-color: black;
`;

export const Tab = styled.div<{ active: boolean }>`
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

export const Tooltip = styled.span`
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
export const TableContainer = styled.div`
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
