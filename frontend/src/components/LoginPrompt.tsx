import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import '../fonts.css'
import { useRecoilState } from 'recoil'
import { userIdState } from '../recoilState'

async function fetchUserProfile() {
	try {
		const response = await fetch('http://localhost:8080/api/player/1/profile')
		const data = await response.json()
		console.log(data)

		return data
	} catch (error) {
		console.log(error)
	}
}

const LoginPrompt: React.FC = () => {
	const navigate = useNavigate()
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [userId, setUserId] = useRecoilState(userIdState)
	const [incorrectLogin, setIncorrectLogin] = useState(false)

	const handleLogin = async () => {
		const fetchedData = await fetchUserProfile()
		if (fetchedData) {
			setIncorrectLogin(false)
			setUserId(fetchedData)
			navigate('/')
		} else {
			setIncorrectLogin(true)
			console.log(fetchedData)
		}
	}

	const handleRegister = () => {
		navigate('/Register')
	}

	const isButtonDisabled = !username || !password

	return (
		<PromptContainer>
			<Container>
				<PromptText>Username</PromptText>
				{incorrectLogin && (
					<IncorrectLoginPrompt> Invalid </IncorrectLoginPrompt>
				)}
			</Container>

			<StyledInput
				type="text"
				placeholder="Username"
				value={username}
				onChange={(e) => setUsername(e.target.value)}
			/>
			<PromptText>Password</PromptText>
			<StyledInput
				type="password"
				placeholder="Password"
				value={password}
				onChange={(e) => setPassword(e.target.value)}
			/>
			<ButtonContainer>
				<Button onClick={handleRegister}>Register</Button>
				<Button onClick={handleLogin} disabled={isButtonDisabled}>
					Login
				</Button>
			</ButtonContainer>
		</PromptContainer>
	)
}

const PromptText = styled.div`
	font-family: 'PixelFont', cursive;
	font-weight: bold;
	font-size: 18px;
`
const StyledInput = styled.input`
	width: 93%;
	padding: 10px;
	margin: 5px 0;
	border-radius: 5px;
	border: none;
`

const Container = styled.div`
	display: flex;
	justify-content: space-between;
`

const IncorrectLoginPrompt = styled.div`
	font-family: 'PixelFont', cursive;
	font-weight: bold;
	font-size: 10px;
	align-self: flex-end;
	color: red;
`

const Button = styled.button`
	background-color: white;
	color: coral;
	border: none;
	padding: 10px 20px;
	margin-top: 10px;
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
const ButtonContainer = styled.div`
	display: flex;
	gap: 10px;
	justify-content: flex-end;
`

const PromptContainer = styled.div`
	background-color: coral;
	color: white;
	padding: 20px;
	border-radius: 10px;
	width: 300px;
	flex-direction: column;
	align-items: left;
`

export default LoginPrompt
