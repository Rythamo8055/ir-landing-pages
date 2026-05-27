import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const data = await req.json();

    // Check if Google Sheet Web App URL is configured
    const webAppUrl = process.env.GOOGLE_SHEET_WEBAPP_URL;

    if (webAppUrl) {
      console.log("Forwarding intake submission to Google Sheets Apps Script:", webAppUrl);
      // Forward the request to Google Sheets Web App
      const response = await fetch(webAppUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Google Sheets App Script returned error:", errorText);
        return NextResponse.json(
          { error: "Google Sheets integration failed." },
          { status: 502 }
        );
      }

      const resData = await response.json();
      return NextResponse.json({ success: true, googleResponse: resData });
    } else {
      console.warn("GOOGLE_SHEET_WEBAPP_URL is not configured in env variables.");
      // Even if Google Sheets URL is not configured, we don't block the frontend success state.
      // We return success but warn about the missing integration environment variable.
      return NextResponse.json({
        success: true,
        warning: "Form data received locally, but GOOGLE_SHEET_WEBAPP_URL env variable is not set."
      });
    }
  } catch (error: any) {
    console.error("Error in contact submission API:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to process form submission." },
      { status: 500 }
    );
  }
}
