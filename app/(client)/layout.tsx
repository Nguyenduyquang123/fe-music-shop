import { Manrope, Hanken_Grotesk } from "next/font/google";
import "../globals.css";
import HeaderPage from "@/public/src/components/layout/headerpage";
import FooterPage from "@/public/src/components/layout/footerpage";

export const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-heading",
  weight: ["400", "500", "600", "700", "800"],
});

export const hankenGrotesk = Hanken_Grotesk({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600", "700"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="vi"
      className={`${manrope.variable} ${hankenGrotesk.variable}`}
    >
      <body className="bg-background text-on-background selection:bg-primary-container selection:text-on-primary-container">
        <HeaderPage />
       <main className="container"> {children}</main>
        <FooterPage />
      </body> 
    </html>
  );
}