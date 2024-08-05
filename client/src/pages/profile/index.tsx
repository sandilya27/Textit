import { useAuthStore } from "@/store/auth-store";

const Profile = () => {
  const { userInfo } = useAuthStore();
  return (
    <div>
      Profile
      <div>Email:{userInfo?.email}</div>
    </div>
  );
};

export default Profile;
