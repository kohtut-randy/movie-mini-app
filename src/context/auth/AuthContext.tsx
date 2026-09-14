import { ComponentProps, createContext, useState } from "react";

type ProfileType = {
  email: string;
  role: string;
};
type AuthDataType = {
  profile: null | ProfileType;
  setProfile: any;
};

const defaultValue: AuthDataType = { profile: null, setProfile: () => {} };

export const AuthContext = createContext(defaultValue);

export const AuthContextWrapper = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  //   const [authcontext, setAuthContext] = useState({ profile: null });

  const [profile, setProfile] = useState(null);
  return <AuthContext value={{ profile, setProfile }}>{children}</AuthContext>;
};
