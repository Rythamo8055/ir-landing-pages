import type { Metadata } from "next";
import { Inter, Sofia_Sans } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const sofiaSans = Sofia_Sans({
  variable: "--font-sofia-sans",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Rythamo Hospitals | Exclusive Interventional Radiology & Vascular Medicine",
  description: "Experience the surgical paradigm shift. Outpatient, pinhole, image-guided procedures replacing invasive surgery. Specialized uterine artery embolization, vascular stenting, and oncology therapies.",
  keywords: "interventional radiology, non-surgical treatment, uterine artery embolization, angioplasty, chemoembolization, Dr. Rythamo, outpatient vascular care",
  authors: [{ name: "Rythamo Hospitals Clinical Board" }],
  openGraph: {
    title: "Rythamo Hospitals | Precision Guidance. Pinhole Healing.",
    description: "The world's premier medical institution dedicated solely to advanced Interventional Radiology. Bypassing incisions, general anesthesia, and prolonged recovery.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${sofiaSans.variable}`}>
      <body>
        {children}
      </body>
    </html>
  );
}
