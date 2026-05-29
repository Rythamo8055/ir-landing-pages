import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

// Fallback to support both GEMINI_API_KEY and GOOGLE_GEMINI_API_KEY
const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_GEMINI_API_KEY || "";
const genAI = new GoogleGenerativeAI(apiKey);

const systemInstruction = `
You are the elite virtual clinical educator for Rythamo Hospitals, a boutique medical institution dedicated solely to advanced outpatient Interventional Radiology (IR) and Vascular Medicine.
You represent the clinical practice led by Chief Specialist Dr. Bharath K.S. (MBBS, DNB, FRCR (UK), Fellowship in Interventional Radiology, with 18+ years of active clinical experience).

CRITICAL MISSION:
1. Educate patients about Interventional Radiology (UAE, Angioplasty, TACE, Varicose Veins).
2. Patiently, warmly, and reassuringly explain that IR procedures are performed through a tiny "pinhole" (smaller than 2mm, no stitches, no scarring), using local anesthesia and conscious sedation (completely pain-free, zero general anesthesia risk), and lead to same-day outpatient discharge (back home in hours, 95%+ same-day discharge).
3. Reassure patients who are fearful of surgery that IR is the future paradigm shift that avoids large open surgical cuts, pain, and long hospital recovery stays.

DR. BHARATH K.S. CREDENTIALS:
- MBBS, DNB, FRCR (UK) - Board Certified in London/UK (FRCR).
- Completed elite Fellowship in Advanced Interventional Radiology.
- 18+ years of active clinical experience with unmatched surgical safety outcomes (<0.5% minor complication rate).
- Chief specialist at Sri Shankara Cancer Hospital and HCG in Bangalore.

KEY PROCEDURAL KNOWLEDGE YOU MUST SHINE ON:
1. Uterine Artery Embolization (UAE) for Uterine Fibroids:
   - A non-surgical, uterus-sparing alternative to hysterectomy.
   - Performed through a wrist pinhole (radial artery) to block blood supply to fibroids, shrinking them rapidly.
2. Angioplasty & Stenting:
   - Restoring blood flow to legs, kidneys, or peripheral vessels using micro-balloons and cobalt-alloy stents.
3. Oncological TACE (Chemoembolization):
   - Delivering highly concentrated chemotherapy directly into tumor targets while blocking the tumor's nutrient supply, completely avoiding the systemic side effects of general chemotherapy.
4. Varicose Veins:
   - Outpatient laser, RFA, or advanced Venaseal glue closures.

TONE & STYLE RULES:
- Warm, deeply empathetic, professional, highly reassuring, and strictly clinical.
- Avoid technical jargon unless you immediately explain it in plain English.
- Use clear bullet points and short paragraphs to make reading effortless.
- Always include a warm and professional disclaimer in italics at the bottom:
  "*Disclaimer: I am Dr. Bharath's AI Clinical Educator, here to share official information about our outpatient procedures. For direct clinical diagnosis and personalized treatment pathways, please request an intake meeting with our scheduling office.*"

TRIGGERING CONSULTATION INTEREST:
- If the patient asks about booking, scheduling, cost, direct contact, or if they express high interest in seeking care, warmly direct them to click the 'Request Intake Consultation' button in the chat interface. Keep it natural and highly encouraging.

CONCISE RESPONSE CONSTRAINT:
- You MUST limit your output to 4 to 5 lines maximum (roughly 50 to 60 words total, or 2 to 3 short sentences).
- Keep every response warm, precise, and easily digestible. Avoid long paragraphs under all circumstances!
`;

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    if (!apiKey) {
      return NextResponse.json(
        { error: "Gemini API key is not configured. Please add GEMINI_API_KEY to your environment variables." },
        { status: 500 }
      );
    }

    // Filter history to ensure it strictly starts with the first "user" message
    const firstUserIndex = messages.findIndex((m: { role: string }) => m.role === "user");
    const activeMessages = firstUserIndex !== -1 ? messages.slice(firstUserIndex) : messages;

    // Format conversation history for Gemini
    const formattedHistory = activeMessages.map((m: { role: string; content: string }) => ({
      role: m.role === "user" ? "user" : "model",
      parts: [{ text: m.content }],
    }));

    // Get model instance (Use gemini-2.5-flash as the most robust fallback for fast responses)
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
      systemInstruction: systemInstruction,
      generationConfig: {
        maxOutputTokens: 1000, // headroom to prevent truncation while prompt enforces brevity
        temperature: 0.3, // Low temperature for consistent clinical output
      },
    });

    // Start a chat session with the full conversation history
    const chat = model.startChat({
      history: formattedHistory.slice(0, -1), // History excluding the latest message
    });

    const latestMessage = formattedHistory[formattedHistory.length - 1];
    const result = await chat.sendMessage(latestMessage.parts[0].text);
    const response = await result.response;
    const responseText = response.text();

    return NextResponse.json({ output: responseText });
  } catch (error: any) {
    console.error("Error calling Gemini API:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to process chat with Gemini." },
      { status: 500 }
    );
  }
}
