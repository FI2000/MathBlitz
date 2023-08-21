import React, { useState } from 'react'
import styled from 'styled-components'
import { useRecoilState } from 'recoil'
import { usernameState } from '../recoilState'
import { useNavigate } from 'react-router-dom'

interface BlitzParameters {
	mod: string | null
	difficulty: string | null
	operations: string | null
	multiplier: number
}

const SetupView: React.FC = () => {
	const [recoilName, setRecoilName] = useRecoilState(usernameState)
	const navigate = useNavigate()

	const [mod, setMod] = useState<string | null>(null)
	const [difficulty, setDifficulty] = useState<string | null>(null)
	const [operations, setOperation] = useState<string | null>(null)
	var multiplier =
		1.0 *
		calculateMultiplier(mod) *
		calculateMultiplier(difficulty) *
		calculateMultiplier(operations)

	const handleNavigation = () => {
		const data: BlitzParameters = {
			mod: mod,
			difficulty: difficulty,
			operations: operations,
			multiplier: multiplier,
		}
		navigate('/Blitz', { state: data })
	}

	const cannotStart = mod !== null && difficulty !== null && operations !== null

	return (
		<>
			<Container>
				<PromptText>Logged in as {recoilName}</PromptText>
			</Container>
			<CC>
				<Modes>
					<TitleMode>
						<PromptText>Blitz</PromptText>
					</TitleMode>
					<ParameterContainer>
						<SmallText>Mods</SmallText>
						<ButtonGroupContainer>
							<Button
								onClick={() => setMod('None')}
								style={
									mod == 'None'
										? { backgroundColor: ' black' }
										: { backgroundColor: ' white' }
								}
							>
								None
							</Button>
							<Button
								onClick={() => setMod('Memory')}
								style={
									mod == 'Memory'
										? { backgroundColor: ' black' }
										: { backgroundColor: ' white' }
								}
							>
								Memory
							</Button>
							<Button
								onClick={() => setMod('Peek-A-Boo')}
								style={
									mod == 'Peek-A-Boo'
										? { backgroundColor: ' black' }
										: { backgroundColor: ' white' }
								}
							>
								Peek-A-Boo
							</Button>
						</ButtonGroupContainer>
					</ParameterContainer>
					<ParameterContainer>
						<SmallText>Difficulty</SmallText>
						<ButtonGroupContainer>
							<Button
								onClick={() => setDifficulty('Normal')}
								style={
									difficulty == 'Normal'
										? { backgroundColor: ' black' }
										: { backgroundColor: ' white' }
								}
							>
								Normal
							</Button>
							<Button
								onClick={() => setDifficulty('Hard')}
								style={
									difficulty == 'Hard'
										? { backgroundColor: ' black' }
										: { backgroundColor: ' white' }
								}
							>
								Hard
							</Button>
							<Button
								onClick={() => setDifficulty('Extreme')}
								style={
									difficulty == 'Extreme'
										? { backgroundColor: ' black' }
										: { backgroundColor: ' white' }
								}
							>
								Extreme
							</Button>
						</ButtonGroupContainer>
					</ParameterContainer>
					<ParameterContainer>
						<SmallText>Operations</SmallText>
						<ButtonGroupContainer>
							<Button
								onClick={() => setOperation('Basic')}
								style={
									operations == 'Basic'
										? { backgroundColor: ' black' }
										: { backgroundColor: ' white' }
								}
							>
								Basic
							</Button>
							<Button
								onClick={() => setOperation('Advanced')}
								style={
									operations == 'Advanced'
										? { backgroundColor: ' black' }
										: { backgroundColor: ' white' }
								}
							>
								Advanced
							</Button>
						</ButtonGroupContainer>
					</ParameterContainer>
					<ScoreMultiplier>x({multiplier.toFixed(3)}) </ScoreMultiplier>
					<StartButton disabled={!cannotStart} onClick={handleNavigation}>
						Start
					</StartButton>
				</Modes>
			</CC>
		</>
	)
}

const ButtonGroupContainer = styled.div`
	display: flex;
	gap: 0px;
	justify-content: center;
	margin-top: 1rem;
`
const ScoreMultiplier = styled.div`
	font-family: 'PixelFont', cursive;
	font-weight: bold;
	font-size: 12px;
	text-align: center;
	margin-bottom: 10px;
`

const StartButton = styled.button`
	background-color: black;
	color: coral;
	border: none;
	padding: 10px 20px;
	margin-left: 30%;

	border-radius: 5px;
	cursor: pointer;
	font-family: 'PixelFont', cursive;
	font-size: 24px;
	width: 155px;
	text-align: center;

	${({ disabled }) =>
		disabled
			? `
        color: grey;
        opacity: 0.6;
        cursor: not-allowed;
    `
			: `
        transition: background-color 0.3s ease-in-out;
        &:hover {
            background-color: black;
        }
    `}
`

const Button = styled.button`
	background-color: white;
	color: coral;
	border: none;
	padding: 10px 20px;
	margin-top: 0px;
	border-radius: 5px;
	cursor: pointer;
	font-family: 'PixelFont', cursive;

	${({ disabled }) =>
		disabled
			? `
            color: grey;
            opacity: 0.6;
            cursor: not-allowed;
        `
			: `
            transition: background-color 0.3s ease-in-out;
            &:hover {
                background-color: black;
            }
        `}
`

const TitleMode = styled.div`
	text-align: center;
	padding-top: 15px;
	width: 400px;
	height: 60px;
`

const SmallText = styled.div`
	font-family: 'PixelFont', cursive;
	font-weight: bold;
	font-size: 16px;
`
const ParameterContainer = styled.div`
	text-align: center;
	padding-top: 15px;
	width: 400px;
	height: 120px;
`

const PromptText = styled.div`
	font-family: 'PixelFont', cursive;
	font-weight: bold;
	font-size: 24px;
`
const Container = styled.div`
	display: flex;
	margin-top: 2rem;
	margin-left: 4rem;
	flex-direction: column;
	text-align: left;
`
const CC = styled.div`
	justify-content: center;
	display: flex;

	max-width: 900px;
	margin-top: 1rem;
	margin-left: 24.9%;
	height: 70vh;
`

const Modes = styled.div`
	display: flex;
	width: 400px;
	flex-direction: column;
`
const calculateMultiplier = (parameter: string | null): number => {
	if (parameter === null) {
		return 1.0
	}
	switch (parameter) {
		case 'None':
			return 1.0
		case 'Memory':
			return 1.7
		case 'Peek-A-Boo':
			return 1.2
		case 'Normal':
			return 1.0
		case 'Hard':
			return 1.3
		case 'Extreme':
			return 1.7
		case 'Basic':
			return 1.0
		case 'Advanced':
			return 1.4
		default:
			return 1.0
	}
}

export default SetupView
