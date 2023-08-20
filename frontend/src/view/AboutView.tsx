import React from 'react'
import styled from 'styled-components'

const AboutView: React.FC = () => {
	return (
		<>
			<Container>
				<PromptText>
					This is a non-commercial small project I decided to do simply to learn
					about Frontend development with Typescript and React and Backend
					development with a Spring boot java server and a Postgre Persistence.
				</PromptText>
				<br />
				<PromptText>
					As for the site itself, it is a mini-game site revolving around
					calculating simple math additions, multiplications, etc. All while
					racing against a timer. There are two types of games : Sequences and
					Blitzes.
				</PromptText>
				<br />
				<PromptText>
					The former is a pre-prepared sequence of equations while the latter is
					an endless survival type mini-game. There are mods to make the game
					more challenging/fun.
				</PromptText>
				<br />
				<PromptText>GLHF</PromptText>
			</Container>
		</>
	)
}

const PromptText = styled.div`
	font-family: 'PixelFont', cursive;
	font-weight: bold;
	font-size: 18px;
`
const Container = styled.div`
	display: flex;
	justify-content: space-between;
	margin-top: 6rem;
	margin-left: 4rem;
	flex-direction: column;
	max-width: 1200px;
`

export default AboutView
