import { ChatHeader } from "@/components/ChatHeader";
import { MessageContainer } from "@/components/MessageContainer";
import { MessageBar } from "@/components/MessageBar";

export const ChatContainer = () => {
  return (
    <div className="fixed top-0 w-screen h-screen flex flex-col md:static md:flex-1 bg-[#1c1d25]">
      <ChatHeader />
      <MessageContainer />
      <MessageBar />
    </div>
  );
};
