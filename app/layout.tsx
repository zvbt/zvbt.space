import type { Metadata } from "next";
import { Inter, Noto_Color_Emoji, Karla } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
const karla = Karla({ subsets: ["latin"] });
export const metadata: Metadata = {
  title: "zvbt.space",
  description: "Personal website featuring all my projects and useful tools.",
  keywords: ["zvbt", "cyadine"],
  robots: "index, follow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={karla.className}>{children}</body>
    </html>
  );
}
