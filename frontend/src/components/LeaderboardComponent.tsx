import React, { useState } from 'react'
import styled from 'styled-components'

interface TabsProps {
	activeTab: number
	handleTabClick: (tabIndex: number) => void
}

interface BlitzScore {
	scoreStreak: number
	scorePoints: number
	scoreMod: string
	username: string
}

const Tabs: React.FC<TabsProps> = ({ activeTab, handleTabClick }) => {
	return (
		<TabsContainer>
			<Tab active={activeTab === 0} onClick={() => handleTabClick(0)}>
				Tab 1<Tooltip>Tooltip Text 1</Tooltip>
			</Tab>
			<Tab active={activeTab === 1} onClick={() => handleTabClick(1)}>
				Tab 2<Tooltip>Tooltip Text 2</Tooltip>
			</Tab>
			<Tab active={activeTab === 2} onClick={() => handleTabClick(2)}>
				Tab 3<Tooltip>Tooltip Text 3</Tooltip>
			</Tab>
			<Tab active={activeTab === 3} onClick={() => handleTabClick(3)}>
				Tab 4<Tooltip>Tooltip Text 4</Tooltip>
			</Tab>
		</TabsContainer>
	)
}

const LeaderboardsTable: React.FC = () => {
	const [activeTab, setActiveTab] = useState(0)

	const handleTabClick = (tabIndex: number) => {
		setActiveTab(tabIndex)
	}

	return (
		<TableContainer>
			<Tabs activeTab={activeTab} handleTabClick={handleTabClick} />
			<Divider />
			{activeTab === 0 && (
				<ScoreTab>
					<ScoreTabContainerLeft>
						<ScoreTabName>PlayerName</ScoreTabName>
						<ScoreTabName>
							1543673<SmallerText>pts</SmallerText>(
							<SmallerCombo>x</SmallerCombo>
							32)
						</ScoreTabName>
					</ScoreTabContainerLeft>
					<ScoreTabContainerRight>
						<ScoreTabMods>PKB</ScoreTabMods>
						<ScoreTabDate>2021-01-11</ScoreTabDate>
					</ScoreTabContainerRight>
				</ScoreTab>
			)}

			{activeTab === 1 && <ScoreTab>Tab 2 Content</ScoreTab>}
			{activeTab === 2 && <ScoreTab>Tab 3 Content</ScoreTab>}
			{activeTab === 3 && <ScoreTab>Tab 4 Content</ScoreTab>}
		</TableContainer>
	)
}

const TabsContainer = styled.div`
	display: flex;
	justify-content: space-between;
`

const ScoreTab = styled.div`
	display: flex;
	border: 1px solid #ccc;
	height: 3.4rem;
	color: black;
	justify-content: space-between;
`
const ScoreTabContainerLeft = styled.div`
	display: flex;
	border: 1px solid black;
	width: 75%;
	flex-direction: column;
	justify-content: space-between;
`

const SmallerText = styled.span`
	font-size: 9px;
	color: grey;
	margin-left: 3px;
`

const SmallerCombo = styled.span`
	font-size: 12px;
	margin-left: 3px;
`

const ScoreTabContainerRight = styled.div`
	display: flex;
	justify-content: flex-end;
	align-items: flex-end;
	border: 1px solid black;
	width: 25%;
	flex-direction: column;
	justify-content: space-between;
`

const ScoreTabName = styled.div`
	font-size: 18px;
	padding-left: 4px;
`
const ScoreTabDate = styled.div`
	font-weight: 50;
	color: grey;
`

const ScoreTabMods = styled.div`
	font-size: 18px;
	padding-left: 4px;
`

const Divider = styled.div`
	height: 2px;
	background-color: black;
`

const Tab = styled.div<{ active: boolean }>`
	position: relative;
	padding: 10px 20px;
	cursor: pointer;
	background-color: white;
	transition: background-color 0.3s ease-in-out;
	border-radius: 10px;
	color: ${(props) => (props.active ? 'coral' : 'black')};
	&:hover {
		span {
			visibility: visible;
			margin-left: 5%;
		}
	}
`

const Tooltip = styled.span`
	position: absolute;
	top: -25px;
	left: 50%;
	transform: translateX(-50%);
	visibility: hidden;
	background-color: rgba(0, 0, 0, 0);
	color: grey;
	padding: 5px;
	border-radius: 4px;
	white-space: nowrap;
`

const TableContainer = styled.div`
	border: 1px solid #ccc;
`

export default LeaderboardsTable
