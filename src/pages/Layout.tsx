import { ReactNode, useContext, useState } from "react";
import Navbar from "../component/Navbar";
import Footer from "../component/Footer";
import { AuthContext, AuthContextWrapper } from "@/context/auth/AuthContext";
import useAuth from "@/hooks/useAuth";

export default function Layout({ children }: { children: ReactNode }) {
  // const authContext = useContext(AuthContext);
  // const isLogin = Boolean(authContext?.profile);

  // console.log({ authContext, isLogin });

  const auth = useAuth();

  console.log({ auth });
  return (
    <div className="min-h-screen flex flex-col gap-10">
      {auth.isLogin && <Navbar />}
      <main>{children}</main>

      <button
        className="text-white"
        onClick={() => auth.setProfile({ email: "hein" })}
      >
        Login
      </button>

      {auth.isLogin && <Footer />}
    </div>
  );
}
