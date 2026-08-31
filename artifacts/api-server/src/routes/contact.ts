import { Router, type Request, type Response } from "express";
import { z } from "zod";
import nodemailer from "nodemailer";
import { logger } from "../lib/logger";

const router = Router();

const contactSchema = z.object({
  name: z.string().min(2, "Full name is required").max(100),
  email: z.string().email("Invalid email address"),
  message: z.string().min(10, "Message must be at least 10 characters").max(5000, "Message is too long"),
});

router.post("/", async (req: Request, res: Response) => {
  try {
    const data = contactSchema.parse(req.body);

    const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, CONTACT_EMAIL } = process.env;

    // Use ethereal mock if testing locally without credentials
    const host = SMTP_HOST || process.env.ETHEREAL_HOST;
    const port = Number(SMTP_PORT || process.env.ETHEREAL_PORT);
    const user = SMTP_USER || process.env.ETHEREAL_USER;
    const pass = SMTP_PASS || process.env.ETHEREAL_PASS;
    const targetEmail = CONTACT_EMAIL || "maitri2k6@gmail.com";

    if (!host || !port || !user || !pass) {
      logger.error("Missing SMTP configuration in environment variables");
      return res.status(500).json({ success: false, message: "Email configuration error on the server." });
    }

    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: {
        user,
        pass,
      },
    });

    const mailOptions = {
      from: `"Portfolio Contact" <${user}>`,
      to: targetEmail,
      replyTo: data.email,
      subject: `New Portfolio Contact - ${data.name}`,
      text: `New message received from your portfolio\n\nName: ${data.name}\nEmail: ${data.email}\n\nMessage:\n${data.message}\n\n---\nSent from Maitri's Portfolio`,
    };

    const info = await transporter.sendMail(mailOptions);
    logger.info({ name: data.name, email: data.email, messageId: info.messageId }, "Contact email sent successfully via Nodemailer");

    // If using ethereal email for testing, log the preview URL
    if (host.includes("ethereal.email")) {
      logger.info({ previewUrl: nodemailer.getTestMessageUrl(info) }, "Test email preview available");
    }

    res.status(200).json({ success: true, message: "Message sent successfully!" });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ success: false, errors: error.errors });
    }
    logger.error({ err: error }, "Failed to send contact email");
    res.status(500).json({ success: false, message: "Failed to send message." });
  }
});

export default router;
