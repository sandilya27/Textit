import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { IoArrowBack } from "react-icons/io5";
import { FaTrash, FaPlus } from "react-icons/fa";
import { toast } from "sonner";

import { useAuthStore } from "@/store/auth-store";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { colors, getColor } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { apiClient } from "@/lib/api-client";
import { config } from "@/utils/config";

const Profile = () => {
  const navigate = useNavigate();
  const { userInfo, setUserInfo } = useAuthStore();

  const profileImageRef = useRef<HTMLInputElement>(null);

  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [image, setImage] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<number>(0);
  const [hovered, setHovered] = useState<boolean>(false);

  useEffect(() => {
    if (userInfo?.profileSetup) {
      setFirstName(userInfo.firstName);
      setLastName(userInfo.lastName);
      setSelectedColor(userInfo.color);
    }
    if (userInfo?.image) {
      console.log(userInfo.image);
      setImage(userInfo.image);
    }
  }, [userInfo]);

  const validateProfile = () => {
    if (!firstName) {
      toast.error("First Name is required");
      return false;
    }
    if (!lastName) {
      toast.error("Last Name is required");
      return false;
    }
    return true;
  };

  const saveChanges = async () => {
    if (validateProfile()) {
      const response = await apiClient.post(
        `${config.authRoute}/update-profile`,
        { firstName, lastName, color: selectedColor },
        { withCredentials: true }
      );
      if (response.status === 200 && response.data) {
        setUserInfo({ ...response.data });
        toast.success("Profile updated successfully");
        navigate("/chat");
      }
    }
  };

  const handleBack = () => {
    if (userInfo?.profileSetup) {
      navigate("/chat");
    } else {
      toast.error("please setup the profile");
    }
  };

  const handleProfileImageInput = () => {
    if (profileImageRef && profileImageRef.current) {
      profileImageRef.current.click();
    }
  };

  const handleProfileImageChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append("profile-image", file);
      const response = await apiClient.post(
        `${config.authRoute}/add-profile-image`,
        formData,
        { withCredentials: true }
      );
      if (response.status === 200 && response.data.image) {
        if (userInfo) {
          setUserInfo({ ...userInfo, image: response.data.image });
          console.log(response.data.image);
          toast.success("Profile image updated sucessfully");
        }
      }
      setImage(response.data.image);
    }
  };

  const handleProfileImageDelete = async () => {
    try {
      const response = await apiClient.delete(
        `${config.authRoute}/remove-profile-image`,
        {
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        if (userInfo) {
          setUserInfo({ ...userInfo, image: null });
          toast.success("Profile image deleted sucessfully");
          setImage(null);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-[#1b1c24] h-[100vh] flex items-center justify-center flex-col gap-10 md:gap-5">
      <div className="flex flex-col gap-10 w-[80vw] md:w-[50vw]">
        <div onClick={handleBack}>
          <IoArrowBack className="text-4xl text-white/90 cursor-pointer" />
        </div>
        <div className="grid grid-cols-2">
          <div
            className="h-full w-32 md:w-48 md:h-48 relative flex items-center justify-center"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            <Avatar className="h-32 w-32 md:w-48 md:h-48 rounded-full overflow-hidden">
              {image ? (
                <AvatarImage
                  src={image}
                  alt="profile"
                  className="object-cover w-full h-full bg-black"
                />
              ) : (
                <div
                  className={`uppercase h-32 w-32 md:w-48 md:h-48 text-5xl border-[1px] flex items-center justify-center rounded-full ${getColor(
                    selectedColor
                  )}`}
                >
                  {firstName
                    ? firstName.split("").shift()
                    : userInfo?.email.split("").shift()}
                </div>
              )}
            </Avatar>
            {hovered && (
              <div
                className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full ring-fuchsia-500"
                onClick={
                  image ? handleProfileImageDelete : handleProfileImageInput
                }
              >
                {image ? (
                  <FaTrash className="text-white text-2xl cursor-pointer" />
                ) : (
                  <FaPlus className="text-white text-2xl cursor-pointer" />
                )}
              </div>
            )}
            <input
              type="file"
              ref={profileImageRef}
              className="hidden"
              onChange={handleProfileImageChange}
              name="profile-image"
              accept=".png, .jpg, .jpeg, .svg, .webp"
            />
          </div>
          <div className="flex min-w-32 md:min-w-32 flex-col gap-5 text-white items-center justify-center">
            <div className="w-full">
              <Input
                placeholder="Email"
                type="email"
                disabled
                value={userInfo?.email}
                className="rounded-lg p-6 bg-[#2c2e3b] border-none"
              />
            </div>
            <div className="w-full">
              <Input
                placeholder="First Name"
                type="text"
                onChange={(e) => setFirstName(e.target.value)}
                value={firstName}
                className="rounded-lg p-6 bg-[#2c2e3b] border-none"
              />
            </div>
            <div className="w-full">
              <Input
                placeholder="Last Name"
                type="text"
                onChange={(e) => setLastName(e.target.value)}
                value={lastName}
                className="rounded-lg p-6 bg-[#2c2e3b] border-none"
              />
            </div>
            <div className="w-full flex gap-5">
              {colors.map((color, index) => {
                return (
                  <div
                    key={index}
                    className={`${color} h-8 w-8 rounded-full cursor-pointer transition-all duration-300 ${
                      selectedColor === index
                        ? "outline outline-white/50 outline-1"
                        : ""
                    }`}
                    onClick={() => setSelectedColor(index)}
                  ></div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="w-full">
          <Button
            className="h-16 w-full bg-purple-700 hover:bg-purple-900 transition-all duration-300"
            onClick={saveChanges}
          >
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
