import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { normalDifficultyEquation } from '../service/BlitzGenerator'
import Countdown from 'react-countdown'
import { useRecoilState } from 'recoil'
import { userIdState, usernameState } from '../recoilState'
import { playCorrect } from '../service/AudioSounds'
import { playWrong } from '../service/AudioSounds'
import { submitUserScore } from '../service/APICalls'
import LeaderboardsTable from './LeaderboardComponent'

interface BlitzParameters {
	mod: string | null
	difficulty: string | null
	operations: string | null
	multiplier: number
}

interface BlitzRound {
	equation: string
	options: number[]
	answer: number
}

interface BlitzScore {
	scoreStreak: number
	scorePoints: number
	scoreMod: string | null
	userId: number | null
	username: string | null
}

const BlitzComponent: React.FC<BlitzParameters> = ({
	mod,
	difficulty,
	operations,
	multiplier,
}) => {
	const [recoilId, setRecoilId] = useRecoilState(userIdState)
	const [recoilName, setRecoilName] = useRecoilState(usernameState)

	const [score, setScore] = useState<number>(0)
	const [streak, setStreak] = useState<number>(1)
	const [maxStreak, setMaxStreak] = useState<number>(1)
	const [lives, setLives] = useState<number>(3)
	const [equation, setEquation] = useState<string | null>(null)
	const [options, setOptions] = useState<number[]>([])
	const [answer, setAnswer] = useState<number>(0)

	const [guessing, setGuessing] = useState(false)
	const [startCountdown, setStartCountdown] = useState(false)
	const [feedback, setFeedback] = useState('...')
	const [guessingDuration, setGuessingDuration] = useState(15)
	const [textVisible, setTextVisible] = useState(true)

	const handleCountdownComplete = () => {
		setGuessing(false)
		setStartCountdown(false)
		setStreak(1)
		setLives(lives - 1)
		setTextVisible(true)
	}

	const handleRound = () => {
		setTimeout(() => {
			setTextVisible(false)
		}, Math.floor(guessingDuration * 0.33) * 1000)

		setGuessingDuration(
			Date.now() + 15000 - Math.min(Math.floor(streak * 0.5) * 1000, 10000)
		)
		setGuessing(true)
		setStartCountdown(true)
		setFeedback('...')

		const round: BlitzRound = normalDifficultyEquation()
		setEquation(round.equation)
		setOptions(round.options)
		setAnswer(round.answer)
	}

	const handleReset = () => {
		setScore(0)
		setStreak(1)
		setMaxStreak(1)
		setLives(3)
		setEquation('')
		setOptions([])
		setAnswer(0)
		setFeedback('...')
		setTextVisible(true)
	}

	const handleAnswer = (chosen: number) => {
		setTextVisible(true)
		let timeTaken = Math.floor(
			(15000 -
				Math.floor(streak * 0.1) * 1000 -
				(guessingDuration - Date.now())) /
				1000
		)
		setGuessing(false)
		setStartCountdown(false)

		if (answer === chosen) {
			playCorrect()
			setScore(Math.ceil(score + streak * 100 * multiplier - 10 * timeTaken))
			setMaxStreak(Math.max(maxStreak, streak + 1))
			setStreak(streak + 1)
			if (streak % 2 == 0 && streak !== 0 && streak < 20) {
				setFeedback('Timer shortened')
			} else {
				setFeedback('Nice')
			}
		} else {
			playWrong()
			setStreak(1)
			setLives(lives - 1)
			setFeedback('Welp')
		}
	}

	const handleSubmit = () => {
		const submittedScore: BlitzScore = {
			scoreStreak: maxStreak,
			scorePoints: score,
			scoreMod: mod,
			userId: recoilId,
			username: recoilName,
		}
		submitUserScore(submittedScore)
		handleReset()
	}

	const renderSeconds = ({ seconds }: any) => {
		return <span>{seconds}</span>
	}

	return (
		<GridContainer>
			<PageContainer>
				<BlitzInfoContainer>
					<PromptText>
						Total Score(x
						{multiplier.toFixed(2)}
						): {score}
					</PromptText>
					<PromptText>
						Streak: {streak}/{maxStreak}
					</PromptText>
					<PromptText>
						Time remaining:{' '}
						{startCountdown && (
							<Countdown
								date={guessingDuration}
								renderer={renderSeconds}
								onComplete={handleCountdownComplete}
							/>
						)}
						{!startCountdown && '-'}
					</PromptText>
				</BlitzInfoContainer>
				<BlitzGameContainer>
					<EquationContainer>
						<p>Equation:</p>
						<p>{equation}</p>
					</EquationContainer>
					<ButtonGroupContainer>
						{options.map((item, index) =>
							mod === 'PeekABoo' ? (
								<PeekABooButton
									key={index}
									onClick={() => handleAnswer(item)}
									disabled={!guessing}
								>
									{' '}
									{item}
								</PeekABooButton>
							) : mod === 'Memory' ? (
								<Button
									key={index}
									onClick={() => handleAnswer(item)}
									disabled={!guessing}
								>
									{textVisible ? item : '?'}
								</Button>
							) : (
								<Button
									key={index}
									onClick={() => handleAnswer(item)}
									disabled={!guessing}
								>
									{' '}
									{item}
								</Button>
							)
						)}
					</ButtonGroupContainer>
				</BlitzGameContainer>
				<FooterContainer>
					<PromptText>Lives:{lives}</PromptText>
					{!guessing && lives > 0 && (
						<StartButton onClick={() => handleRound()}> Blitz </StartButton>
					)}
					{lives == 0 && (
						<SubmitButton onClick={handleSubmit} disabled={recoilId === null}>
							{' '}
							Submit {recoilId === null && <DisabledText>Log in</DisabledText>}
						</SubmitButton>
					)}
				</FooterContainer>
				<FeedbackContainer>
					{lives > 0 && (
						<FeedbackText content={feedback}>{feedback}</FeedbackText>
					)}
					{lives == 0 && (
						<ResetButton onClick={handleReset}> Reset </ResetButton>
					)}
				</FeedbackContainer>
			</PageContainer>
			<LeaderboardsContainer>
				<LeaderboardsTable></LeaderboardsTable>
			</LeaderboardsContainer>
		</GridContainer>
	)
}

const PromptText = styled.div`
	font-family: 'PixelFont', cursive;
	font-weight: bold;
	font-size: 24px;
	margin-bottom: 12px;
`

const PageContainer = styled.div`
	font-family: 'PixelFont', cursive;
	font-weight: bold;
	font-size: 32px;
	border: 1px solid black;
`

const LeaderboardsContainer = styled.div`
	font-family: 'PixelFont', cursive;
	font-weight: bold;
	font-size: 13px;
	border: 2px solid black;
	margin-left: 40px;
	margin-right: 10px;
	border-image: linear-gradient(to bottom, black, transparent);
	border-image-slice: 1;
`

const GridContainer = styled.div`
	display: grid;
	grid-template-columns: 2.4fr 1fr;
	gap: 10px;
`

const EquationContainer = styled.div`
	font-family: 'PixelFont', cursive;
	font-weight: bold;
	font-size: 32px;
	margin-bottom: 12px;
	text-align: center;
	flex-direction: column;
`

const BlitzInfoContainer = styled.div`
	display: flex;
	margin-left: 4rem;
	flex-direction: column;
	text-align: left;
`

const BlitzGameContainer = styled.div`
	display: flex;
	margin-left: 4rem;
	height: 17rem;
	flex-direction: column;
	text-align: left;
	border: 1px solid black;
`
const FooterContainer = styled.div`
	display: flex;
	height: 90px;
	margin-left: 4rem;
	text-align: left;
	align-items: center;
`

const FeedbackContainer = styled.div`
	display: flex;
	height: 90px;
	margin-left: 4rem;
	justify-content: center;
	align-items: center;
	font-family: 'PixelFont', cursive;
	font-weight: bold;
	font-size: 24px;
`
const FeedbackText = styled.p`
	color: ${(props) =>
		props.content === 'Nice'
			? 'green'
			: props.content === 'Welp'
			? 'red'
			: 'black'};
`

const ButtonGroupContainer = styled.div`
	display: flex;
	gap: 40px;
	justify-content: center;
	margin-top: 1rem;
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
	font-size: 32px;

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

const PeekABooButton = styled.button`
	background-color: white;
	color: white;
	border: none;
	padding: 10px 20px;
	margin-top: 0px;
	border-radius: 5px;
	cursor: pointer;
	font-family: 'PixelFont', cursive;
	font-size: 32px;

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
        `};
`

const StartButton = styled.button`
	background-color: white;
	color: coral;
	border: none;
	padding: 10px 20px;

	margin-left: 75%;

	border-radius: 5px;
	cursor: pointer;
	font-family: 'PixelFont', cursive;
	font-size: 24px;
	width: 155px;
	height: 70px;
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

const ResetButton = styled.button`
	background-color: white;
	color: coral;
	border: none;
	padding: 10px 20px;

	border-radius: 5px;
	cursor: pointer;
	font-family: 'PixelFont', cursive;
	font-size: 24px;
	width: 155px;
	height: 70px;
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

const SubmitButton = styled.button`
	background-color: white;
	color: coral;
	border: none;
	padding: 10px 20px;

	margin-left: 75%;

	border-radius: 5px;
	font-family: 'PixelFont', cursive;
	font-size: 24px;
	width: 155px;
	height: 70px;
	text-align: center;

	cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
	opacity: ${(props) => (props.disabled ? 0.6 : 1)};

	transition: background-color 0.3s ease-in-out;
	&:hover {
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

		span {
			visibility: visible;
			margin-left: 5%;
		}
	}
`

const DisabledText = styled.span`
	margin-left: 60%;
	color: black;
	font-size: 14px;
	font-weight: bold;
	visibility: hidden;
`

export default BlitzComponent
