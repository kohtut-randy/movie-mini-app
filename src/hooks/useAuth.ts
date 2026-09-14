import { AuthContext } from "@/context/auth/AuthContext";
import { useContext } from "react";
import { useRouter } from "next/router";

export default function useAuth() {
  const authContext = useContext(AuthContext);
  const isLogin = Boolean(authContext?.profile);
  const router = useRouter();

  const profileData = authContext?.profile;
  const logout = () => {
    authContext?.setProfile(null);
    // localStorage.removeItem("profile");
    router.push("/");
  };

  console.log({ profileData });

  return {
    isLogin,
    profileData,
    setProfile: authContext?.setProfile,
    logout,
  };
}
