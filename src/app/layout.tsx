import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import AuthProvider from "@/components/providers/AuthProvider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Blood Donation",
  description: "Blood Donation App",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <AuthProvider>
          <Navbar />
          <div className="bg-gradient-to-b from -[#fff6f7] dark:from-secondary dark:to-black to-white">
            <main className="container min-h-screen mx-auto ">{children}</main>
          </div>
          <Footer />
          </AuthProvider>
        </ThemeProvider>
        </body>
    </html>
  );
}
