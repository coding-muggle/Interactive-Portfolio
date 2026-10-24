import nodemailer from "nodemailer";

// package.json sets "type": "module", so this function must use ESM
// (import/export). A CommonJS `require` crashes before the handler runs.
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ ok: false, error: "Method not allowed" });
  }

  try {
    const { name, email, message } = req.body || {};
    if (!name || !email || !message) {
      return res.status(400).json({ ok: false, error: "Missing fields" });
    }

    const to = process.env.CONTACT_TO_EMAIL;
    const user = process.env.GMAIL_USER || to;
    const pass = process.env.GMAIL_APP_PASSWORD;

    if (!to || !user || !pass) {
      return res.status(500).json({ ok: false, error: "Missing env vars" });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user, pass },
    });

    await transporter.sendMail({
      from: `"Portfolio Contact" <${user}>`,
      to,
      replyTo: email,
      subject: `New message from ${name}`,
      text: `From: ${name} <${email}>\n\n${message}`,
    });

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error("CONTACT_SEND_ERROR:", err);
    return res.status(500).json({ ok: false, error: "Send failed" });
  }
}
