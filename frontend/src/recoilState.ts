import { atom } from 'recoil'

export const usernameState = atom<string | null>({
	key: 'usernameState',
	default: 'Guest',
})

export const userIdState = atom<number | null>({
	key: 'userIdState',
	default: null,
})
