import { Router } from "express";

const router = Router();

const stubJobs = [
  {
    _id: "job-1",
    title: "Production Engineer",
    company: "Manufacturing Client",
    location: "Ghaziabad, UP",
    type: "Full-time",
    education: "Diploma",
    salary: "As per industry standards",
    description:
      "Responsible for production planning, quality checks, and team coordination in a fast-paced manufacturing environment.",
    postedAt: new Date().toISOString(),
  },
  {
    _id: "job-2",
    title: "HR Executive",
    company: "Corporate Client",
    location: "Noida, UP",
    type: "Full-time",
    education: "Graduate",
    description:
      "Manage recruitment coordination, employee onboarding, and HR documentation for growing teams.",
    postedAt: new Date().toISOString(),
  },
  {
    _id: "job-3",
    title: "IT Support Specialist",
    company: "Technology Client",
    location: "Delhi NCR",
    type: "Contract",
    education: "Graduate",
    description:
      "Provide desktop support, troubleshooting, and helpdesk assistance for enterprise users.",
    postedAt: new Date().toISOString(),
  },
  {
    _id: "job-4",
    title: "Welding Technician",
    company: "Automotive Client",
    location: "Manesar, Haryana",
    type: "Full-time",
    education: "ITI",
    description:
      "Perform MIG/TIG welding operations with adherence to safety and quality standards.",
    postedAt: new Date().toISOString(),
  },
  {
    _id: "job-5",
    title: "Warehouse Supervisor",
    company: "Logistics Client",
    location: "Greater Noida, UP",
    type: "Full-time",
    education: "12th",
    description:
      "Oversee inventory, dispatch operations, and team performance in warehouse operations.",
    postedAt: new Date().toISOString(),
  },
  {
    _id: "job-6",
    title: "English Trainer",
    company: "Legpro Training",
    location: "Ghaziabad, UP",
    type: "Part-time",
    education: "Graduate",
    description:
      "Deliver workplace English and communication training for job seekers and apprentices.",
    postedAt: new Date().toISOString(),
  },
];

router.get("/", (req, res) => {
  const { title, location, type } = req.query;
  let jobs = [...stubJobs];

  if (title) {
    const q = String(title).toLowerCase();
    jobs = jobs.filter((j) => j.title.toLowerCase().includes(q));
  }
  if (location) {
    const q = String(location).toLowerCase();
    jobs = jobs.filter((j) => j.location.toLowerCase().includes(q));
  }
  if (type) {
    jobs = jobs.filter((j) => j.type === type);
  }

  res.json({ success: true, jobs });
});

router.get("/:id", (req, res) => {
  const job = stubJobs.find((j) => j._id === req.params.id);
  if (!job) {
    return res.status(404).json({ success: false, error: "Job not found" });
  }
  res.json({ success: true, job });
});

export default router;
