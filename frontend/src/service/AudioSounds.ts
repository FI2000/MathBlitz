import correctSound from '../assets/audio/CorrectSFX.wav'
import wrongSound from '../assets/audio/WrongSFX.wav'

export function playCorrect() {
	new Audio(correctSound).play()
}

export function playWrong() {
	new Audio(wrongSound).play()
}
