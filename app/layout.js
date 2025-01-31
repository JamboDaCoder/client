import "./globals.css";
import { Besley } from "next/font/google";

const besley = Besley({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-besley",
});

export const metadata = {
  title: "JamChat Demo",
  description: "Made By Jamario Washington",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${besley.variable} font-besley`}>{children}</body>
    </html>
  );
}
