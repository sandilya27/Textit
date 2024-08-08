import { useNavigate } from "react-router-dom";
import { FiEdit2 } from "react-icons/fi";
import { IoLogOut } from "react-icons/io5";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { getColor } from "@/lib/utils";
import { useAuthStore } from "@/store/auth-store";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { apiClient } from "@/lib/api-client";
import { config } from "@/utils/config";

export const ProfileInfo = () => {
  const { userInfo, setUserInfo } = useAuthStore();
  const navigate = useNavigate();

  const logOut = async () => {
    try {
      const response = await apiClient.post(
        `${config.authRoute}/logout`,
        {},
        {
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        navigate(`/auth`);
        setUserInfo(null);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="absolute bottom-0 flex items-center justify-between px-10 w-full bg-[#2a2b33] py-2">
      <div className="flex gap-3 items-center justify-center ">
        <div className="w-12 h-12 relative">
          {userInfo && (
            <Avatar className="h-12 w-12 rounded-full overflow-hidden">
              {userInfo.image ? (
                <AvatarImage
                  src={userInfo.image}
                  alt="profile"
                  className="object-cover w-full h-full bg-black"
                />
              ) : (
                <div
                  className={`uppercase h-12 w-12 text-lg border-[1px] flex items-center justify-center rounded-full ${getColor(
                    userInfo.color
                  )}`}
                >
                  {userInfo.firstName
                    ? userInfo.firstName.split("").shift()
                    : userInfo?.email.split("").shift()}
                </div>
              )}
            </Avatar>
          )}
        </div>
        <div>
          {userInfo?.firstName && userInfo.lastName
            ? `${userInfo?.firstName} ${userInfo?.lastName}`
            : ""}
        </div>
      </div>
      <div className="flex gap-5">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <FiEdit2
                className="text-purple-500 text-xl font-medium"
                onClick={() => navigate(`/profile`)}
              />
            </TooltipTrigger>
            <TooltipContent className="bg-[#1c1b1e] border-none text-white">
              Edit Profile
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <IoLogOut
                className="text-red-500 text-xl font-medium"
                onClick={logOut}
              />
            </TooltipTrigger>
            <TooltipContent className="bg-[#1c1b1e] border-none text-white">
              Logout
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
};
