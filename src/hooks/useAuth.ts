import { AuthContext } from "@/context/auth/AuthContext";
import { useContext } from "react";

export default function useAuth() {
  const authContext = useContext(AuthContext);
  const isLogin = Boolean(authContext?.profile);

  const profileData = authContext?.profile;
  const logout = () => {
    authContext?.setProfile(null);
  };

  return {
    isLogin,
    profileData,
    setProfile: authContext?.setProfile,
    logout,
  };
}
