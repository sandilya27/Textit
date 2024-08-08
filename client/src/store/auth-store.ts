import { create } from 'zustand'

export interface User {
    id: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    image: string | null;
    color: number;
    profileSetup: boolean;
}

type UserType = {
    userInfo: User | undefined,
    setUserInfo: (userInfo: User | undefined) => void
}

export const useAuthStore = create<UserType>()((set) => ({
    userInfo: undefined,
    setUserInfo: (userInfo) => set({ userInfo }),
}))

