import { ReactNode } from "react";
import Navbar from "../component/Navbar";
import Footer from "../component/Footer";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col gap-10">
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
