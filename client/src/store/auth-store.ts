import { create } from 'zustand'

interface User {
    id: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    image: string;
    color: number;
    profileSetup: boolean;
}

type UserType = {
    userInfo: User | undefined,
    setUserInfo: (userInfo: User) => void
}

export const useAuthStore = create<UserType>()((set) => ({
    userInfo: undefined,
    setUserInfo: (userInfo) => set({ userInfo }),
}))

