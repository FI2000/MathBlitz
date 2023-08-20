import React from 'react'
import { useRecoilState } from 'recoil'
import { userIdState, usernameState } from '../recoilState'

const AboutView: React.FC = () => {
	const [recoilId, setRecoilId] = useRecoilState(userIdState)
	const [recoilName, setRecoilName] = useRecoilState(usernameState)
	return (
		<>
			<p>{recoilId}</p>
			<p>{recoilName}</p>
		</>
	)
}

export default AboutView
