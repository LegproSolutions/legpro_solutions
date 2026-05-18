import { Router } from "express";
import { z } from "zod";
import mongoose from "mongoose";
import Contact from "../models/Contact.js";

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

    if (mongoose.connection.readyState === 1) {
      const lead = await Contact.create(data);
      return res.status(201).json({
        success: true,
        message: "Thank you for contacting us. We will get back to you soon.",
        id: lead._id,
      });
    }

    console.log("[Contact - no DB]", data);
    return res.status(201).json({
      success: true,
      message: "Thank you for contacting us. We will get back to you soon.",
    });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return res.status(400).json({ success: false, error: err.errors[0].message });
    }
    console.error(err);
    return res.status(500).json({ success: false, error: "Failed to submit contact form" });
  }
});

export default router;
