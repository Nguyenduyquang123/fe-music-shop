import { Manrope, Hanken_Grotesk } from "next/font/google";
import "./globals.css";
import { ConfigProvider } from "antd";

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
      <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>


      <body>
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: "#FFB800",
              borderRadius: 8,
            },
          }}
        >

          {children}
        </ConfigProvider>
      </body>
    </html>
  );
}