/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from 'zustand'

type ChatState = {
    selectedChatType: string | undefined;
    selectedChatData: any;
    selectedChatMessages: any[];
    setSelectedChatType: (selectedChatType: string | undefined) => void;
    setSelectedChatData: (selectedChatData: any) => void;
    setSelectedChatMessages: (selectedChatMessages: any[]) => void;
    closeChat: () => void;
};

export const useChatStore = create<ChatState>()((set) => ({
    selectedChatType: undefined,
    selectedChatData: undefined,
    selectedChatMessages: [],
    setSelectedChatType: (selectedChatType) => set({ selectedChatType }),
    setSelectedChatData: (selectedChatData) => set({ selectedChatData }),
    setSelectedChatMessages: (selectedChatMessages) => set({ selectedChatMessages }),
    closeChat: () => set({ selectedChatType: undefined, selectedChatData: undefined, selectedChatMessages: [] }),

}))