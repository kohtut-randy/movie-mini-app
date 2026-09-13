import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "./Layout";
import { AuthContextWrapper } from "@/context/auth/AuthContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthContextWrapper>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AuthContextWrapper>
  );
}
