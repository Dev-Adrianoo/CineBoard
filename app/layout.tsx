import type { Metadata } from "next";
import "./globals.css";
import { Header } from "./components/header/header";
import { Footer } from "./components/footer/footer";
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'

export const metadata: Metadata = {
  title: "CineBoards",
  description: "Aplicativo de cartazes de filmes dispóniveis nos cinemas",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>
        <Header />
        <ToastContainer autoClose={3000} />
        {children}
        <Footer />
      </body>
    </html>
  );
}
