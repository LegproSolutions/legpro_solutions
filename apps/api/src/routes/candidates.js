import { Router } from "express";
import { z } from "zod";
import Candidate from "../models/Candidate.js";
import { sendCandidateNotification } from "../services/emailService.js";

const router = Router();

const phoneRegex = /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]{7,15}$/;

const candidateProfileSchema = z.object({
  fullName: z
    .string({ required_error: "Full name is required" })
    .trim()
    .min(2, "Full name must be at least 2 characters")
    .max(120, "Full name cannot exceed 120 characters"),
  mobileNumber: z
    .string({ required_error: "Mobile number is required" })
    .trim()
    .min(10, "Mobile number must be at least 10 digits")
    .max(16, "Mobile number cannot exceed 16 digits")
    .refine((val) => phoneRegex.test(val), {
      message: "Please enter a valid mobile phone number",
    }),
  email: z
    .string({ required_error: "Email ID is required" })
    .trim()
    .toLowerCase()
    .email("Please provide a valid email address"),
  currentLocation: z
    .string({ required_error: "Current location is required" })
    .trim()
    .min(2, "Current location is required")
    .max(120, "Location cannot exceed 120 characters"),
  highestQualification: z
    .string({ required_error: "Highest qualification is required" })
    .trim()
    .min(1, "Please select or enter your highest qualification"),
  totalExperience: z
    .string({ required_error: "Total experience is required" })
    .trim()
    .min(1, "Please select or specify your total experience"),
  currentCompany: z
    .string({ required_error: "Current/previous company is required" })
    .trim()
    .min(1, "Please enter your current or most recent company"),
  currentDesignation: z.string().trim().optional().nullable().or(z.literal("")),
  skills: z
    .string({ required_error: "Key skills are required" })
    .trim()
    .min(2, "Please enter your key skills"),
  profileCategory: z
    .string({ required_error: "Profile category is required" })
    .trim()
    .min(1, "Please select a profile category"),
  preferredRole: z.string().optional().nullable(),
  preferredLocation: z
    .string({ required_error: "Preferred location is required" })
    .trim()
    .min(1, "Please enter your preferred work location"),
  currentCtc: z.string().optional().nullable(),
  expectedCtc: z.string().optional().nullable(),
  noticePeriod: z.string().optional().nullable(),
  linkedinUrl: z.string().optional().nullable(),
  resumeFilename: z.string().optional().nullable(),
  resumeData: z.string().optional().nullable(),
  resumeMimeType: z.string().optional().nullable(),
  notes: z.string().optional().nullable(),
});

// POST /api/v1/candidates - Submit candidate profile to Talent Pool
router.post("/", async (req, res) => {
  try {
    const data = candidateProfileSchema.parse(req.body);

    // Validate resume format if a file was provided
    if (data.resumeFilename) {
      const allowedExtensions = [".pdf", ".doc", ".docx"];
      const lowerName = data.resumeFilename.toLowerCase();
      const isValidExt = allowedExtensions.some((ext) => lowerName.endsWith(ext));
      if (!isValidExt) {
        return res.status(400).json({
          success: false,
          error: "Invalid resume format. Only PDF, DOC, and DOCX files are allowed.",
        });
      }
    }

    const candidate = await Candidate.create(data);

    // Send asynchronous email notification (does not block response)
    sendCandidateNotification({
      ...candidate,
      resumeFilename: data.resumeFilename,
    }).catch((err) => {
      console.error("[Candidate Router] Background email error:", err);
    });

    return res.status(201).json({
      success: true,
      message: "Thank You for Joining Our Talent Pool! Your profile has been successfully submitted.",
      candidate: {
        id: candidate.id || candidate._id,
        fullName: candidate.fullName,
        email: candidate.email,
        mobileNumber: candidate.mobileNumber,
        profileCategory: candidate.profileCategory,
        status: candidate.status,
      },
      jobMelaUrl: "https://jobmela.co.in",
    });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        error: err.errors[0]?.message || "Validation failed",
        errors: err.errors,
      });
    }
    console.error("[Candidate Router Error]:", err);
    return res.status(500).json({
      success: false,
      error: "An unexpected error occurred while saving your candidate profile. Please try again.",
    });
  }
});

// GET /api/v1/candidates - Filter & search candidates for HR Talent Pool
router.get("/", async (req, res) => {
  try {
    const { search, category, status, location, experience } = req.query;
    const candidates = await Candidate.findAll({
      search: search ? String(search).trim() : undefined,
      category: category ? String(category).trim() : undefined,
      status: status ? String(status).trim() : undefined,
      location: location ? String(location).trim() : undefined,
      experience: experience ? String(experience).trim() : undefined,
    });

    return res.json({
      success: true,
      count: candidates.length,
      candidates,
    });
  } catch (err) {
    console.error("[Candidate Router GET Error]:", err);
    return res.status(500).json({ success: false, error: "Failed to fetch candidate pool" });
  }
});

// GET /api/v1/candidates/:id - Get full candidate details including resume
router.get("/:id", async (req, res) => {
  try {
    const candidate = await Candidate.findById(req.params.id);
    if (!candidate) {
      return res.status(404).json({ success: false, error: "Candidate not found" });
    }
    return res.json({ success: true, candidate });
  } catch (err) {
    console.error("[Candidate Router GET by ID Error]:", err);
    return res.status(500).json({ success: false, error: "Failed to fetch candidate" });
  }
});

// PATCH /api/v1/candidates/:id/status - Update candidate status and/or HR notes
router.patch("/:id/status", async (req, res) => {
  try {
    const { status, notes } = req.body;
    const validStatuses = [
      "New",
      "Shortlisted",
      "Contacted",
      "Interview Scheduled",
      "Selected",
      "Rejected",
      "On Hold",
      "Future Requirement",
      "Hired",
    ];

    if (status && !validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        error: `Invalid status. Must be one of: ${validStatuses.join(", ")}`,
      });
    }

    const updated = await Candidate.updateStatus(req.params.id, { status, notes });
    if (!updated) {
      return res.status(404).json({ success: false, error: "Candidate not found" });
    }

    return res.json({
      success: true,
      message: "Candidate status updated successfully",
      candidate: updated,
    });
  } catch (err) {
    console.error("[Candidate Router PATCH Status Error]:", err);
    return res.status(500).json({ success: false, error: "Failed to update candidate status" });
  }
});

// DELETE /api/v1/candidates/:id - Remove candidate record
router.delete("/:id", async (req, res) => {
  try {
    await Candidate.delete(req.params.id);
    return res.json({ success: true, message: "Candidate removed from pool" });
  } catch (err) {
    console.error("[Candidate Router DELETE Error]:", err);
    return res.status(500).json({ success: false, error: "Failed to delete candidate" });
  }
});

export default router;
