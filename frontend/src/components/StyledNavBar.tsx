import React from 'react'
import styled from 'styled-components'
import '../fonts.css'
import { useNavigate } from 'react-router-dom'

const NavbarContainer = styled.nav`
	background: linear-gradient(to left, coral 50%, white, white);
	color: white;
	padding: 1rem;
	border-radius: 10px;
	display: flex;
	justify-content: space-between;
	align-items: center;
`

const NavBrand = styled.div`
	font-size: 1.5rem;
	font-weight: bold;
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

interface StyledNavbarProps {
	brandImageSrc: string
	navItems: string[]
}

const StyledNavBar: React.FC<StyledNavbarProps> = ({
	brandImageSrc,
	navItems,
}) => {
	const navigate = useNavigate()
	const handleNavigate = (route: string) => {
		navigate(route)
	}
	return (
		<NavbarContainer>
			<BrandImage
				src={brandImageSrc}
				alt="Brand Image"
				onClick={() => handleNavigate('/')}
			/>
			<NavItems>
				{navItems.map((item, index) => (
					<NavItem key={index} onClick={() => handleNavigate(item)}>
						{item}
					</NavItem>
				))}
			</NavItems>
		</NavbarContainer>
	)
}

export default StyledNavBar
