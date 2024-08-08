import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { useAuthStore } from "@/store/auth-store";
import { ChatContainer } from "@/components/ChatContainer";
import { EmptyChatContainer } from "@/components/EmptyChatContainer";
import { ContactsContainer } from "@/components/ContactsContainer";
import { useChatStore } from "@/store/chat-store";

const Chat = () => {
  const { userInfo } = useAuthStore();
  const { selectedChatType } = useChatStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!userInfo?.profileSetup) {
      toast("Please setup profile to continue.");
      navigate("/profile");
    }
  }, [userInfo, navigate]);
  return (
    <div className="flex h-screen text-white overflow-hidden">
      <ContactsContainer />

      {selectedChatType === undefined ? (
        <EmptyChatContainer />
      ) : (
        <ChatContainer />
      )}
    </div>
  );
};

export default Chat;
