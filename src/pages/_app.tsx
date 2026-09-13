import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "./Layout";
import RouteGuard from "@/component/RouteGuard";
import { AuthProvider } from "@/context/AuthContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Layout>
        <RouteGuard>
          <Component {...pageProps} />
        </RouteGuard>
      </Layout>
    </AuthProvider>
  );
}
