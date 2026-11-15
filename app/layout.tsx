import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "DRONA SAJIVANI",
  description:
    "DRONA SAJIVANI - Online Shopping, Wholesale, Retail, Import and Export Marketplace",

  applicationName: "DRONA SAJIVANI",

  manifest: "/manifest.json",

  icons: {
    icon: "/icon.png",
    apple: "/icon.png",
  },

  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "DRONA SAJIVANI",
  },
};

export const viewport: Viewport = {
  themeColor: "#D4AF37",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
