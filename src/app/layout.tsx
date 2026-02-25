import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Impactmonitor Regio Foodvalley",
  description: "Inzicht in de voortgang op strategische doelen van Regio Foodvalley via KPI's en trends.",
  keywords: ["Regio Foodvalley", "Impactmonitor", "KPI", "Strategische Agenda", "CHE", "MKB"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nl">
      <body className={`${dmSans.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
