import type { Metadata } from "next";
import { Inter, Noto_Color_Emoji } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
const noto = Noto_Color_Emoji({ subsets: ["emoji"], weight: "400" });

export const metadata: Metadata = {
  title: "zvbt.space",
  description: "Personal website with all my projects",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
