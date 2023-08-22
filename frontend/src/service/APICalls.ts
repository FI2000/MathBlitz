export async function registerUserProfile(
	username: string,
	password: string
): Promise<number | undefined> {
	const url = `http://localhost:8080/api/user/register?username=${username}&password=${password}`

	try {
		const response = await fetch(url, {
			method: 'POST',
		})

		if (!response.ok) {
			throw new Error('Network response was not ok')
		}

		return response.status
	} catch (error) {
		alert(error)
	}
}

export async function fetchUserProfile(username: string, password: string) {
	try {
		const response = await fetch(
			`http://localhost:8080/api/user/profile?username=${username}&password=${password}`
		)
		const data = await response.json()
		return data
	} catch (error) {
		alert(error)
	}
}

export async function submitUserScore(
	userScore: BlitzScore
): Promise<number | undefined> {
	const url = `http://localhost:8080/api/score/submit`

	try {
		const response = await fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json', // Set the Content-Type header
			},
			body: JSON.stringify(userScore),
		})

		if (!response.ok) {
			throw new Error('Server Error when trying to submit score...')
		}

		return response.status
	} catch (error) {
		alert(error)
	}
}

interface BlitzScore {
	scoreStreak: number
	scorePoints: number
	scoreMod: string | null
	userId: number | null
	username: string | null
}
