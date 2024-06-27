import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "./list.css";
import "./input.css";
import "./form-container.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ToDo List"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
