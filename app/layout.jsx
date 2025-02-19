import "./globals.css";
import { Inter } from "next/font/google";
import { PT_Serif } from "next/font/google";
import { Merriweather } from "next/font/google";
import NextTopLoader from "nextjs-toploader";
import { SpeedInsights } from "@vercel/speed-insights/next";

export const dynamic = "force-dynamic";

const inter = Inter({ subsets: ["latin"] });
const ptSerif = PT_Serif({ subsets: ["latin"], weight: ["400", "700"] });
const merriWeather = Merriweather({
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
});

export const metadata = {
  title: "MeMori",
  description: "A Grave Finder App",
  manifest: "/manifest.json",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta
          name="google-site-verification"
          content="EWoDLgsigWxVnAc_AN3phlF2ZZ7xVIj3u6TtGaTE9B0"
        />
      </head>
      <body className={merriWeather.className}>
        <NextTopLoader />
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}
