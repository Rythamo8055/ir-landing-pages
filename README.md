# Rythamo Hospitals — Interventional Radiology Landing Pages

Welcome to the official, public repository for **Rythamo Hospitals' Interventional Radiology (IR)** premium landing pages. 

## 🌐 Live Production Domains

* **Test Variant 1 (Dual-Tone Vascular theme):** 🔗 [https://ir-landing-page-test-1.vercel.app](https://ir-landing-page-test-1.vercel.app)
* **Test Variant 2 (Luxury Editorial theme):** 🔗 [https://irlandingtest.vercel.app](https://irlandingtest.vercel.app)

---

## 📂 Project Architecture

The repository is structured as follows:

```
├── landing-page test/        # Test Variant 1: Dual-tone design, vascular highlights
└── landing page test 2/      # Test Variant 2: Luxury editorial theme, Gemini 2.5 chatbot integration
```

---

## 🚀 Key Features & UI Aesthetics

* **Solid & Stable Navigation:** Replaced the glassmorphic pill navbar with a high-contrast, opaque card styling (`var(--white)`) in `landing page test 2` for a reliable, seamless reading experience across all viewports.
* **Hyper-Legible Hero Branding:** Configured solid opaque titles with soft backing shadows in `landing page test 2` to eliminate text blend overlaps and guarantee immediate legibility on high-resolution displays.
* **Gemini 2.5 Outpatient Chatbot:** Powered by Google's flagship **`gemini-2.5-flash`** model. Acts as an empathetic, professional virtual clinical educator that answers patient questions about Uterine Artery Embolization (UAE), TACE, Angioplasty, and Varicose Vein therapies in concise, 4-line outlines.
* **Live Google Sheets Integration:** A serverless API route in `/api/contact` automatically routes all patient consultation requests straight to a secure Google Spreadsheet via Google Apps Script.

---

## ⚙️ Google Sheets Integration Setup

To connect submissions from the live forms directly to your Google Sheet:

1. Create a **Google Sheet**.
2. Go to **Extensions > Apps Script** and paste this code:
   ```javascript
   function doPost(e) {
     try {
       var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
       var data = JSON.parse(e.postData.contents);
       
       sheet.appendRow([
         new Date(),
         data.name || "",
         data.phone || "",
         data.email || "",
         data.procedure || data.procedureInterest || "",
         data.date || data.urgency || "",
         data.message || ""
       ]);
       
       return ContentService.createTextOutput(JSON.stringify({ status: "success" }))
         .setMimeType(ContentService.MimeType.JSON);
     } catch (error) {
       return ContentService.createTextOutput(JSON.stringify({ status: "error", message: error.toString() }))
         .setMimeType(ContentService.MimeType.JSON);
     }
   }
   ```
3. Click **Deploy > New Deployment**, select **Web App**, set access to **Anyone**, and click Deploy.
4. Copy the generated Web App URL and add it to your project environment variables in Vercel as **`GOOGLE_SHEET_WEBAPP_URL`**.

---

## 🛠️ Local Development

To run either project locally, navigate to the folder and start the Turbopack server:

```bash
# For Variant 2
cd "landing page test 2"
npm run dev

# For Variant 1
cd "landing-page test"
npm run dev
```
