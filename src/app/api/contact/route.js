import nodemailer from "nodemailer";

export async function POST(req) {
    try {
        const { name, email, service, message } = await req.json();

        if (!name || !email || !message) {
            return Response.json({ error: "Missing required fields" }, { status: 400 });
        }

        // ── Nodemailer transporter using Gmail ────────────────────────────────────
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.GMAIL_USER,    // kaifm9096@gmail.com
                pass: process.env.GMAIL_PASS,    // Gmail App Password (not your real password)
            },
        });

        // ── Email to YOU (notification) ───────────────────────────────────────────
        await transporter.sendMail({
            from: `"Portfolio Contact" <${process.env.GMAIL_USER}>`,
            to: process.env.GMAIL_USER,
            replyTo: email,
            subject: `New inquiry — ${service || "General"} from ${name}`,
            html: `
        <div style="font-family:'Helvetica Neue',sans-serif;max-width:560px;margin:0 auto;background:#09090f;color:#fff;border-radius:16px;overflow:hidden;">
          <div style="background:linear-gradient(135deg,#7c3aed,#4f46e5);padding:28px 32px;">
            <h2 style="margin:0;font-size:22px;font-weight:800;color:#fff;letter-spacing:-0.5px;">
              New Portfolio Inquiry
            </h2>
            <p style="margin:6px 0 0;font-size:13px;color:rgba(255,255,255,0.7);">
              Someone reached out through your portfolio
            </p>
          </div>
          <div style="padding:28px 32px;">
            <table style="width:100%;border-collapse:collapse;">
              <tr>
                <td style="padding:10px 0;font-size:12px;color:rgba(255,255,255,0.4);text-transform:uppercase;letter-spacing:0.06em;width:120px;">Name</td>
                <td style="padding:10px 0;font-size:14px;color:#fff;font-weight:600;">${name}</td>
              </tr>
              <tr style="border-top:1px solid rgba(255,255,255,0.06);">
                <td style="padding:10px 0;font-size:12px;color:rgba(255,255,255,0.4);text-transform:uppercase;letter-spacing:0.06em;">Email</td>
                <td style="padding:10px 0;font-size:14px;color:#a78bfa;font-weight:600;">${email}</td>
              </tr>
              <tr style="border-top:1px solid rgba(255,255,255,0.06);">
                <td style="padding:10px 0;font-size:12px;color:rgba(255,255,255,0.4);text-transform:uppercase;letter-spacing:0.06em;">Service</td>
                <td style="padding:10px 0;font-size:14px;color:#4ade80;font-weight:600;">${service || "Not specified"}</td>
              </tr>
              <tr style="border-top:1px solid rgba(255,255,255,0.06);">
                <td style="padding:10px 0;font-size:12px;color:rgba(255,255,255,0.4);text-transform:uppercase;letter-spacing:0.06em;vertical-align:top;">Message</td>
                <td style="padding:10px 0;font-size:14px;color:rgba(255,255,255,0.75);line-height:1.7;">${message.replace(/\n/g, "<br/>")}</td>
              </tr>
            </table>
            <div style="margin-top:24px;padding-top:20px;border-top:1px solid rgba(255,255,255,0.06);">
              <a href="mailto:${email}" style="display:inline-block;background:linear-gradient(135deg,#7c3aed,#4f46e5);color:#fff;padding:12px 24px;border-radius:10px;text-decoration:none;font-size:13px;font-weight:700;">
                Reply to ${name} →
              </a>
            </div>
          </div>
        </div>
      `,
        });

        // ── Auto-reply to the CLIENT ──────────────────────────────────────────────
        await transporter.sendMail({
            from: `"Muhammad Kaif" <${process.env.GMAIL_USER}>`,
            to: email,
            subject: `Got your message, ${name.split(" ")[0]}! — Muhammad Kaif`,
            html: `
        <div style="font-family:'Helvetica Neue',sans-serif;max-width:560px;margin:0 auto;background:#09090f;color:#fff;border-radius:16px;overflow:hidden;">
          <div style="background:linear-gradient(135deg,#7c3aed,#4f46e5);padding:28px 32px;">
            <h2 style="margin:0;font-size:22px;font-weight:800;color:#fff;letter-spacing:-0.5px;">
              Thanks for reaching out!
            </h2>
            <p style="margin:6px 0 0;font-size:13px;color:rgba(255,255,255,0.7);">
              Muhammad Kaif · Full-Stack Developer
            </p>
          </div>
          <div style="padding:28px 32px;">
            <p style="font-size:15px;color:rgba(255,255,255,0.75);line-height:1.75;margin:0 0 16px;">
              Hi ${name.split(" ")[0]},
            </p>
            <p style="font-size:15px;color:rgba(255,255,255,0.75);line-height:1.75;margin:0 0 16px;">
              I've received your message about <strong style="color:#a78bfa;">${service || "your project"}</strong> and I'll get back to you within 24 hours.
            </p>
            <p style="font-size:15px;color:rgba(255,255,255,0.75);line-height:1.75;margin:0 0 28px;">
              In the meantime, feel free to check out my work at <a href="https://kaif.dev" style="color:#a78bfa;text-decoration:none;">kaif.dev</a> or connect on <a href="https://github.com/kaifdev01" style="color:#a78bfa;text-decoration:none;">GitHub</a>.
            </p>
            <div style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:12px;padding:18px 20px;margin-bottom:24px;">
              <p style="margin:0;font-size:12px;color:rgba(255,255,255,0.35);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:8px;">Your message</p>
              <p style="margin:0;font-size:13px;color:rgba(255,255,255,0.55);line-height:1.65;">${message.replace(/\n/g, "<br/>")}</p>
            </div>
            <p style="font-size:14px;color:rgba(255,255,255,0.45);line-height:1.7;margin:0;">
              Best regards,<br/>
              <strong style="color:#fff;">Muhammad Kaif</strong><br/>
              <span style="color:rgba(255,255,255,0.3);">Full-Stack Developer · MERN + Next.js</span>
            </p>
          </div>
        </div>
      `,
        });

        return Response.json({ success: true });

    } catch (err) {
        console.error("Contact form error:", err);
        return Response.json({ error: "Failed to send message" }, { status: 500 });
    }
}