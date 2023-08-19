import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import '../fonts.css'

const LoginPrompt: React.FC = () => {
	const navigate = useNavigate()
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')

	const handleLogin = () => {
		navigate('/')
	}

	const handleRegister = () => {
		navigate('/Register')
	}

	return (
		<PromptContainer>
			<PromptText>Username</PromptText>
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
				<Button onClick={handleLogin}>Login</Button>
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

const Button = styled.button`
	background-color: white;
	color: coral;
	border: none;
	padding: 10px 20px;
	margin-top: 10px;
	border-radius: 5px;
	cursor: pointer;
	font-family: 'PixelFont', cursive;

	transition: background-color 0.3s ease-in-out;
	&:hover {
		background-color: black;
	}
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
