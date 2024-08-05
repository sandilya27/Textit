import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useAuthStore } from "@/store/auth-store";
import { toast } from "sonner";

const Chat = () => {
  const { userInfo } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!userInfo?.profileSetup) {
      toast("Please setup profile to continue.");
      navigate("/profile");
    }
  }, [userInfo,navigate]);
  return <div>Chat</div>;
};

export default Chat;
