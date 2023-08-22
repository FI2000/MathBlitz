import React from 'react'
import styled from 'styled-components'
import '../fonts.css'
import { useNavigate } from 'react-router-dom'
import { userIdState, usernameState } from '../recoilState'
import { useRecoilState } from 'recoil'

const StyledNavBar: React.FC<StyledNavbarProps> = ({ brandImageSrc }) => {
	const navigate = useNavigate()
	const handleNavigate = (route: string) => {
		navigate(route)
	}

	const [recoilId, setRecoilId] = useRecoilState(userIdState)
	const [recoilName, setRecoilName] = useRecoilState(usernameState)

	const handleLogout = () => {
		setRecoilId(null)
		setRecoilName('Guest')
	}

	return (
		<NavbarContainer>
			<BrandImage
				src={brandImageSrc}
				alt="Brand Image"
				onClick={() => handleNavigate('/')}
			/>
			<NavItems>
				{!recoilId && (
					<NavItem onClick={() => handleNavigate('/Login')}>Login</NavItem>
				)}
				{recoilId && <NavName>{recoilName}</NavName>}
				<NavItem onClick={() => handleNavigate('/Setup')}>Blitz</NavItem>
				<NavItem onClick={() => handleNavigate('/About')}>About</NavItem>
				{recoilId && <NavItem onClick={() => handleLogout()}>Logout</NavItem>}
			</NavItems>
		</NavbarContainer>
	)
}

const NavbarContainer = styled.nav`
	background: linear-gradient(to left, coral 50%, white, white);
	color: white;
	padding: 1rem;
	border-radius: 10px;
	display: flex;
	justify-content: space-between;
	align-items: center;
`

const BrandImage = styled.img`
	width: 24rem;
	height: 5rem;
`

const NavItems = styled.ul`
	list-style: none;
	display: flex;
	gap: 2rem;
	justify-content: flex-end;
`

const NavItem = styled.li`
	cursor: pointer;
	font-family: 'PixelFont', cursive;
	font-weight: bold;
	font-size: 18px;

	transition: color 0.3s;

	&:hover {
		color: black;
	}
`

const NavName = styled.li`
	font-family: 'PixelFont', cursive;
	font-weight: bold;
	font-size: 18px;
	color: black;
`

interface StyledNavbarProps {
	brandImageSrc: string
}

export default StyledNavBar
