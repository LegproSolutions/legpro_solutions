import { Router } from "express";
import { z } from "zod";
import { getIsConnected } from "../db/index.js";
import Contact from "../models/Contact.js";
import { sendContactNotification } from "../services/emailService.js";

const router = Router();

const contactSchema = z.object({
  firstName: z.string().min(1).max(100),
  lastName: z.string().min(1).max(100),
  email: z.string().email(),
  company: z.string().max(200).optional(),
  message: z.string().min(1).max(5000),
});

router.post("/", async (req, res) => {
  try {
    const data = contactSchema.parse(req.body);
    let lead = null;

    if (getIsConnected()) {
      lead = await Contact.create(data);
    } else {
      console.log("[Contact - no DB]", data);
    }

    // Trigger email notification in background (does not block db success response)
    if (lead) {
      sendContactNotification(lead).catch((emailErr) => {
        console.error("[Contact Router] Failed to send email notification asynchronously:", emailErr);
      });
    } else {
      // In-memory fallback notification
      sendContactNotification({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        message: data.message,
        createdAt: new Date().toISOString()
      }).catch((emailErr) => {
        console.error("[Contact Router] Failed to send fallback email notification:", emailErr);
      });
    }

    return res.status(201).json({
      success: true,
      message: "Thank you for contacting us. We will get back to you soon.",
      id: lead ? lead._id : undefined,
    });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return res.status(400).json({ success: false, error: err.errors[0].message });
    }
    console.error(err);
    return res.status(500).json({ success: false, error: "Failed to submit contact form" });
  }
});

router.get("/", async (req, res) => {
  try {
    if (getIsConnected()) {
      const contacts = await Contact.findAll();
      return res.json({ success: true, contacts });
    }
    return res.status(400).json({ success: false, error: "Database not connected" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, error: "Failed to fetch contact forms" });
  }
});

export default router;
