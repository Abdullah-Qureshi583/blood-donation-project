import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AuthProvider from "@/components/providers/AuthProvider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Script from "next/script";
import JsonLd from "@/components/seo/JsonLd";

const inter = Inter({ subsets: ["latin"] });

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://aq-blood-life.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default:
      "Blood-Life | Emergency Blood Donor Network & Blood Group Matching",
    template: "%s | Blood-Life",
  },
  description:
    "Connect with voluntary blood donors in real-time. Search by blood group (A+, B+, O+, AB+, O-), district, or submit emergency blood requests 24/7 to save lives.",
  applicationName: "Blood-Life",
  authors: [
    {
      name: "Abdullah Qureshi",
      url: "https://abdullah-qureshi.vercel.app",
    },
  ],
  creator: "Abdullah Qureshi",
  publisher: "Blood-Life",
  keywords: [
    "blood donation",
    "emergency blood request",
    "find blood donors",
    "blood group matching",
    "voluntary blood donor",
    "O negative blood donor",
    "A positive blood donor",
    "B positive blood",
    "AB positive blood",
    "universal blood donor",
    "blood bank portal",
    "blood transfusion network",
    "Pakistan blood donors",
    "urgent blood required",
    "donate blood save lives",
    "Blood Life",
    "Abdullah Qureshi",
  ],
  alternates: {
    canonical: siteUrl,
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/logo.png",
  },
  openGraph: {
    title: "Blood-Life | Emergency Blood Donor Network & Blood Group Matching",
    description:
      "Save lives with Blood-Life. Connect with voluntary donors, find compatible blood groups in your area, and post emergency blood requests 24/7.",
    url: siteUrl,
    siteName: "Blood-Life",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Blood-Life - Emergency Blood Donor Registration & Request Network",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blood-Life | Emergency Blood Donor Network",
    description:
      "Real-time voluntary blood donor matching and emergency blood request dispatch. Every drop counts.",
    images: ["/og-image.jpg"],
    creator: "@abdullahqureshi",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google:
      process.env.GOOGLE_SITE_VERIFICATION || "googlee34c2c102a28c308",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <JsonLd siteUrl={siteUrl} />
      </head>
      <body className={inter.className}>
        <AuthProvider>
          <Navbar />
          <div className="bg-gradient-to-b from-[#fff6f7] dark:from-secondary dark:to-black to-white">
            <main className="container min-h-screen mx-auto">{children}</main>
          </div>
          <Footer />
        </AuthProvider>
        <Script src="/liquid-glass.jsx" />
      </body>
    </html>
  );
}