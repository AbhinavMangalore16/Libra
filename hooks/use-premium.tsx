import { create } from "zustand";
interface usePremiumStore{
    open: boolean;
    onOpen: () => void;
    onClose: () => void;
}

export const usePremium = create<usePremiumStore>((set)=> ({
    open: false,
    onOpen: () => set({open: true}),
    onClose: () => set({ open: false})
}));