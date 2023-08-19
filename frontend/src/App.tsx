import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import StyledNavBar from './components/StyledNavBar'
import logoImage from './assets/images/siteLogo.png'
import LoginView from './view/LoginView'

function App() {
	return (
		<BrowserRouter>
			<StyledNavBar brandImageSrc={logoImage} navItems={['Login', 'About']} />
			<Routes>
				<Route path="/" />
				<Route path="/Login" element={<LoginView />} />
				<Route path="/About" />
			</Routes>
		</BrowserRouter>
	)
}

export default App
