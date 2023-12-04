import { Toaster } from "@/app/components/ui/toaster";
import { Inter } from "next/font/google";
import { NavContainer } from "./components/navbar/nav-container";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Egresados UCR",
  description:
    "Sistema de Gestión de Egresados de la Universidad de Costa Rica",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className={`${inter.className} min-h-screen bg-background`}>
        <NavContainer />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
