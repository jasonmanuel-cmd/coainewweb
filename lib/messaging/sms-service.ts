export type MessagePayload = {
  to: string;
  body: string;
  leadId: string;
};

export type MessageResult = {
  provider: string;
  status: "sent" | "queued" | "failed";
  payload: MessagePayload;
};

export interface MessagingProvider {
  name: string;
  sendSms(payload: MessagePayload): Promise<MessageResult>;
}

class ConsoleProvider implements MessagingProvider {
  name = "console";

  async sendSms(payload: MessagePayload): Promise<MessageResult> {
    console.info(`[messaging:${this.name}]`, payload);
    return { provider: this.name, status: "queued", payload };
  }
}

class TwilioProvider implements MessagingProvider {
  name = "twilio";

  async sendSms(payload: MessagePayload): Promise<MessageResult> {
    const sid = process.env.TWILIO_ACCOUNT_SID;
    const token = process.env.TWILIO_AUTH_TOKEN;
    const from = process.env.TWILIO_FROM_NUMBER;

    if (!sid || !token || !from) {
      throw new Error("Twilio provider missing credentials.");
    }

    const endpoint = `https://api.twilio.com/2010-04-01/Accounts/${sid}/Messages.json`;
    const body = new URLSearchParams({
      To: payload.to,
      From: from,
      Body: payload.body
    });

    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        Authorization: `Basic ${Buffer.from(`${sid}:${token}`).toString("base64")}`,
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body
    });

    if (!response.ok) {
      const text = await response.text();
      throw new Error(`Twilio send failed: ${text}`);
    }

    return { provider: this.name, status: "sent", payload };
  }
}

export function getMessagingProvider(): MessagingProvider {
  if (process.env.SMS_PROVIDER === "twilio") {
    return new TwilioProvider();
  }
  return new ConsoleProvider();
}
