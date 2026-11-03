import { NextResponse } from "next/server";

// Assistant quote requests are intentionally prepared client-side for the
// visitor to review and send through WhatsApp. Never accept or email a lead
// from this endpoint while the Resend sender domain is not verified.
export async function POST() {
  return NextResponse.json(
    { error: "Las solicitudes del asesor se preparan para enviar por WhatsApp." },
    { status: 410 },
  );
}
