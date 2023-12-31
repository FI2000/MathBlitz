import { atom } from 'recoil'
import { recoilPersist } from 'recoil-persist'

const { persistAtom } = recoilPersist()
export const usernameState = atom<string | null>({
	key: 'usernameState',
	default: 'Guest',
	effects_UNSTABLE: [persistAtom],
})

export const userIdState = atom<number | null>({
	key: 'userIdState',
	default: null,
	effects_UNSTABLE: [persistAtom],
})
