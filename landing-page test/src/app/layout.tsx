import type { Metadata, Viewport } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#050b14",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Rythamo Hospitals | Exclusive Interventional Radiology & Vascular Care",
  description: "Experience the future of surgery at Rythamo Hospitals. Specialized strictly in advanced, image-guided Interventional Radiology (IR) and pinhole procedures. No open surgery, faster recovery, minimal pain.",
  keywords: [
    "Interventional Radiology",
    "Boutique vascular hospital",
    "Minimally invasive surgery",
    "Angioplasty",
    "Stenting",
    "Uterine Artery Embolization",
    "Vertebroplasty",
    "Rythamo Hospitals",
    "Pinhole healing",
    "Non-surgical clinic",
    "Vascular care Baltimore"
  ],
  authors: [{ name: "Rythamo Hospitals Medical Editorial Board" }],
  creator: "Rythamo Hospitals",
  publisher: "Rythamo Hospitals",
  formatDetection: {
    telephone: true,
    address: true,
  },
  alternates: {
    canonical: "https://www.rythamohospitals.com",
  },
  openGraph: {
    title: "Rythamo Hospitals | Pioneer in Interventional Radiology",
    description: "Operated exclusively through image-guided precision. Bypassing traditional surgical incisions for rapid same-day recovery.",
    url: "https://www.rythamohospitals.com",
    siteName: "Rythamo Hospitals",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rythamo Hospitals | Pinhole Healing",
    description: "The world's first medical institution dedicated solely to advanced Interventional Radiology and Vascular Medicine.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Rich clinical schema markup for search engines (JSON-LD)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    "name": "Rythamo Hospitals",
    "alternateName": "Rythamo Interventional Radiology & Vascular Specialists",
    "description": "Rythamo Hospitals is a highly specialized medical center dedicated exclusively to advanced Interventional Radiology (IR). Bypassing traditional open surgery through real-time image-guided precision therapies.",
    "url": "https://www.rythamohospitals.com",
    "logo": "https://www.rythamohospitals.com/assets/logo.png",
    "telephone": "+1-855-798-4266",
    "medicalSpecialty": [
      "https://schema.org/InterventionalRadiology",
      "https://schema.org/VascularMedicine"
    ],
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "100 Precision Way, Suite 400",
      "addressLocality": "Baltimore",
      "addressRegion": "MD",
      "postalCode": "21201",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 39.2904,
      "longitude": -76.6122
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday"
      ],
      "opens": "08:00",
      "closes": "18:00"
    },
    "contactPoint": [
      {
        "@type": "ContactPoint",
        "telephone": "+1-855-798-4266",
        "contactType": "Patient Scheduling Office",
        "areaServed": "US",
        "availableLanguage": ["English", "Spanish"]
      },
      {
        "@type": "ContactPoint",
        "telephone": "+1-855-798-4200",
        "contactType": "Physician Referral Hotline",
        "areaServed": "US",
        "availableLanguage": "English"
      }
    ]
  };

  return (
    <html
      lang="en"
      className={`${inter.variable} ${outfit.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-obsidian text-light font-sans selection:bg-cyan-glow/20 selection:text-light">
        {children}
      </body>
    </html>
  );
}
