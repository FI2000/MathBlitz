import React, { useState } from 'react'
import styled from 'styled-components'

interface TabsProps {
	activeTab: number
	handleTabClick: (tabIndex: number) => void
}

const TabsContainer = styled.div`
	display: flex;
	justify-content: space-between;
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

const TableContainer = styled.div`
	border: 1px solid #ccc;
`

const LeaderboardsTable: React.FC = () => {
	const [activeTab, setActiveTab] = useState(0)

	const handleTabClick = (tabIndex: number) => {
		setActiveTab(tabIndex)
	}

	return (
		<TableContainer>
			<Tabs activeTab={activeTab} handleTabClick={handleTabClick} />
			{activeTab === 0 && <div>Tab 1 Content</div>}
			{activeTab === 1 && <div>Tab 2 Content</div>}
			{activeTab === 2 && <div>Tab 3 Content</div>}
			{activeTab === 3 && <div>Tab 4 Content</div>}
		</TableContainer>
	)
}

export default LeaderboardsTable
