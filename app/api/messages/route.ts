import { NextResponse } from "next/server";
import { getMessagingProvider } from "@/lib/messaging/sms-service";

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as { to: string; body: string; leadId: string };
    const provider = getMessagingProvider();
    const result = await provider.sendSms(payload);
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Message dispatch failed" },
      { status: 500 }
    );
  }
}
