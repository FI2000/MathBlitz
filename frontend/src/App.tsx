import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import StyledNavBar from './components/StyledNavBar'
import logoImage from './assets/images/siteLogo.png'
import LoginView from './view/LoginView'
import RegisterView from './view/RegisterView'
import AboutView from './view/AboutView'
import { userIdState, usernameState } from './recoilState'
import { useRecoilState } from 'recoil'
import SetupView from './view/SetupView'
import BlitzView from './view/BlitzView'
import Homeview from './view/HomeView'

function App() {
	const [recoilId, setRecoilId] = useRecoilState(userIdState)
	const [recoilName, setRecoilName] = useRecoilState(usernameState)

	return (
		<BrowserRouter>
			<StyledNavBar brandImageSrc={logoImage} />
			<Routes>
				<Route path="/" element={<Homeview />} />
				<Route path="/Setup" element={<SetupView />} />
				{!recoilId ? (
					<Route path="/Login" element={<LoginView />} />
				) : (
					<Route path="/" />
				)}
				{!recoilId ? (
					<Route path="/Register" element={<RegisterView />} />
				) : (
					<Route path="/" />
				)}
				<Route path="/Blitz" element={<BlitzView />} />
				<Route path="/About" element={<AboutView />} />
			</Routes>
		</BrowserRouter>
	)
}

export default App
