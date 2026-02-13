"use client";
import { Message} from "@/types/types";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useRouter } from "next/navigation";
import React, { Dispatch, useCallback, useState } from "react";
import { createContext } from "react";

export type appContext = {
  isOpen: boolean;
  input: string;
  prompt: string;
  hoverid: string;
  isSendingPrompt: boolean;
  reply: string | null;
  router: AppRouterInstance;
  chats: Message[];
  refreshHome: number;
  isSettingNewChat: boolean;
  latestReply: string | null;
  currThread : string | null,
  setcurrThread : Dispatch<React.SetStateAction<string | null>>;
  setLatestReply: Dispatch<React.SetStateAction<string | null>>;
  setisSettingNewChat: Dispatch<React.SetStateAction<boolean>>;
  setInput: Dispatch<React.SetStateAction<string>>;
  setprompt: Dispatch<React.SetStateAction<string>>;
  setHoverid: (id: string) => void;
  setisSendingPrompt: Dispatch<React.SetStateAction<boolean>>;
  setreply: Dispatch<React.SetStateAction<string | null>>;
  setChats: Dispatch<React.SetStateAction<Message[]>>;
  setRefreshHome: Dispatch<React.SetStateAction<number>>;
  toggle: () => void;
  close: () => void;
  open: () => void;
};

export const Context = createContext<appContext>({
  isOpen: true,
  hoverid: "",
  prompt: "",
  isSendingPrompt: false,
  reply: null,
  router: {} as AppRouterInstance,
  chats: [],
  refreshHome: 0,
  input: "",
  isSettingNewChat: false,
  latestReply: null,
  currThread : "",
  setcurrThread : ()=>{},
  setLatestReply: () => {},
  setisSettingNewChat: () => {},
  setInput: () => {},
  setRefreshHome: () => {},
  setChats: () => {},
  setreply: () => {},
  setisSendingPrompt: () => {},
  setprompt: () => {},
  setHoverid: (id) => {},
  toggle: () => {},
  close: () => {},
  open: () => {},
});

const ContextProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const [isOpen, setisOpen] = useState(true);
  const [hoverid, setHoverid] = useState("");
  const [input, setInput] = useState("");
  const [prompt, setprompt] = useState("");
  const [reply, setreply] = useState<string | null>(null);
  const [chats, setChats] = useState<Message[]>([]);
  const [latestReply, setLatestReply] = useState<string | null>(null);
  const [refreshHome, setRefreshHome] = useState<number>(0);
  const [currThread,setcurrThread] = useState<string | null>(null);
  const [isSendingPrompt, setisSendingPrompt] = useState(false);
  const [isSettingNewChat, setisSettingNewChat] = useState(false);

  const toggle = useCallback(() => setisOpen((o) => !o), []);
  const close = useCallback(() => setisOpen(false), []);
  const open = useCallback(() => setisOpen(true), []);

  return (
    <Context.Provider
      value={{
        isOpen,
        toggle,
        close,
        open,
        hoverid,
        setHoverid,
        prompt,
        setprompt,
        latestReply,
        setLatestReply,
        reply,
        setreply,
        currThread,
        setcurrThread,
        isSendingPrompt,
        setisSendingPrompt,
        isSettingNewChat,
        setisSettingNewChat,
        router,
        chats,
        setChats,
        refreshHome,
        setRefreshHome,
        input,
        setInput,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default ContextProvider;
