// functions/api/submit.js
export async function onRequestPost(context) {
  try {
    const req = context.request;
    const form = await req.formData();

    const name = (form.get("name") || "").toString().trim();
    const email = (form.get("email") || "").toString().trim();
    const message = (form.get("message") || "").toString().trim();

    if (!name || !email || !message) {
      return json({ ok: false, error: "Missing required fields." }, 400);
    }

    const TO_EMAIL = context.env.TO_EMAIL;
    const FROM_EMAIL = context.env.FROM_EMAIL || "noreply@retailpulses.com";
    const SUBJECT_PREFIX = context.env.SUBJECT_PREFIX || "[Retailpulses]";

    if (!TO_EMAIL) {
      return json({ ok: false, error: "Server not configured: TO_EMAIL is missing." }, 500);
    }

    const subject = `${SUBJECT_PREFIX} Contact form submission`;
    const bodyText =
`New contact form submission

Name: ${name}
Email: ${email}

Message:
${message}

---
Time: ${new Date().toISOString()}
IP: ${req.headers.get("CF-Connecting-IP") || ""}
User-Agent: ${req.headers.get("User-Agent") || ""}
`;

    const resp = await fetch("https://api.mailchannels.net/tx/v1/send", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        personalizations: [{ to: [{ email: TO_EMAIL }] }],
        from: { email: FROM_EMAIL, name: "Retailpulses GK" },
        reply_to: { email, name },
        subject,
        content: [{ type: "text/plain", value: bodyText }],
      }),
    });

    if (!resp.ok) {
      const detail = await resp.text().catch(() => "");
      return json({ ok: false, error: "Mail send failed.", detail }, 502);
    }

    return json({ ok: true }, 200);
  } catch (err) {
    return json({ ok: false, error: "Unexpected error." }, 500);
  }
}

function json(obj, status = 200) {
  return new Response(JSON.stringify(obj), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store",
    },
  });
}
