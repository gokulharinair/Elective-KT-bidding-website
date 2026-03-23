import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "KT Wiki — IIM Lucknow MBA Elective Intelligence",
  description:
    "Peer-driven insights on course content, professor quality, teaching environment, and bidding demand for IIM Lucknow PGP-2 elective bidding.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,300;0,400;0,700;0,900;1,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
