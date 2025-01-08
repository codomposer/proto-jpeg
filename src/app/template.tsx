import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import { PropsWithChildren } from "react";

export default function RootTemplate({ children }: PropsWithChildren) {
  return (
    <>
      <Header />
      <main className="max-w-3xl flex flex-col mx-auto">{children}</main>
      <Footer />
    </>
  );
}
