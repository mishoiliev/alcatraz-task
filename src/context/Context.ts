import create from "zustand";
import { persist } from "zustand/middleware";
import { Thread } from "../../types/thread";

//using zustand which works on the principal of context, but made insanely easy to work with
export interface StoreProps {
  username: string;
  threads: Thread[];
  loggedIn: boolean;
  setLoggedIn: (value: boolean) => void;
  setUsername: (value: string) => void;
  addThread: (value: Thread) => void;
  setThreads: (value: Thread[]) => void;
}

export const useStore = create(
  persist<StoreProps>((set) => ({
    username: "",
    threads: [],
    loggedIn: false,
    setLoggedIn: (value: boolean) => set({ loggedIn: value }),
    setUsername: (username: string) => set({ username: username }),
    addThread: (thread: Thread) =>
      set((state) => ({ threads: { ...state.threads, thread } })),
    setThreads: (threads) => set({ threads: threads }),
  }))
);
