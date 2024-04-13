import type { Metadata } from "next";
import { Poppins,Fira_Code } from "next/font/google";
import Nav from "@/components/ui/nav";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const poppins = Poppins({
  weight: ["400", "500", "600","700","800"],
  subsets: ["latin"],
  display: "swap",
  style: "normal",
  variable: "--font-poppins",
});
const fira = Fira_Code({
  weight: ["400", "500", "600","700"],
  subsets: ["latin"],
  display: "swap",
  style: "normal",
  variable: "--font-fira",
});
export const metadata: Metadata = {
  title: "Ctodo",
  description: "The Cross Platform Todo App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${poppins.variable} ${fira.variable}`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Nav />
          {children}
          <Toaster/>
        </ThemeProvider>
      </body>
    </html>
  );
}
