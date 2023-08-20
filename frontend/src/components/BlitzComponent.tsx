import React from 'react'
import styled from 'styled-components'

interface BlitzParameters {
	mod: string | null
	difficulty: string | null
	operations: string | null
}

const BlitzComponent: React.FC<BlitzParameters> = ({
	mod,
	difficulty,
	operations,
}) => {
	return (
		<>
			<p>{mod}</p>
			<p>{difficulty}</p>
			<p>{operations}</p>
		</>
	)
}

export default BlitzComponent
