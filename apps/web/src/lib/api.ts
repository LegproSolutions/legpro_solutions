const API_URL = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000").replace(/\/$/, "");

export async function submitContact(data: {
  firstName: string;
  lastName: string;
  email: string;
  company?: string;
  message: string;
}) {
  const res = await fetch(`${API_URL}/api/v1/contact`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const json = await res.json();
  if (!res.ok) {
    throw new Error(json.error || "Failed to send message");
  }
  return json;
}

export type Job = {
  _id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  education: string;
  salary?: string;
  description: string;
  postedAt: string;
};

export async function fetchJobs(params?: {
  title?: string;
  location?: string;
  type?: string;
}) {
  const search = new URLSearchParams();
  if (params?.title) search.set("title", params.title);
  if (params?.location) search.set("location", params.location);
  if (params?.type) search.set("type", params.type);

  const qs = search.toString();
  const res = await fetch(`${API_URL}/api/v1/jobs${qs ? `?${qs}` : ""}`);
  const json = await res.json();
  if (!res.ok) throw new Error(json.error || "Failed to fetch jobs");
  return json.jobs as Job[];
}

export type CandidateInput = {
  fullName: string;
  mobileNumber: string;
  email: string;
  currentLocation: string;
  highestQualification: string;
  totalExperience: string;
  currentCompany: string;
  currentDesignation: string;
  skills: string;
  profileCategory: string;
  preferredRole?: string | null;
  preferredLocation: string;
  currentCtc?: string | null;
  expectedCtc?: string | null;
  noticePeriod?: string | null;
  linkedinUrl?: string | null;
  resumeFilename?: string | null;
  resumeData?: string | null;
  resumeMimeType?: string | null;
  notes?: string | null;
};

export type CandidateRecord = {
  _id: string | number;
  id: string | number;
  fullName: string;
  mobileNumber: string;
  email: string;
  currentLocation: string;
  highestQualification: string;
  totalExperience: string;
  currentCompany: string;
  currentDesignation: string;
  skills: string;
  profileCategory: string;
  preferredRole?: string;
  preferredLocation: string;
  currentCtc?: string;
  expectedCtc?: string;
  noticePeriod?: string;
  linkedinUrl?: string;
  resumeFilename?: string;
  resumeData?: string;
  resumeMimeType?: string;
  status:
    | "New"
    | "Shortlisted"
    | "Contacted"
    | "Interview Scheduled"
    | "Selected"
    | "Rejected"
    | "On Hold"
    | "Future Requirement"
    | "Hired";
  notes?: string;
  createdAt: string;
  updatedAt: string;
};

export async function submitCandidateDetails(data: CandidateInput) {
  try {
    const res = await fetch(`${API_URL}/api/v1/candidates`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const json = await res.json();
    if (!res.ok) {
      throw new Error(json.error || "Failed to submit candidate profile");
    }
    return json;
  } catch (err: unknown) {
    try {
      const fallbackRes = await fetch("/api/candidates", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const fallbackJson = await fallbackRes.json();
      if (fallbackRes.ok) {
        return fallbackJson;
      }
    } catch {
      // ignore
    }
    const msg = err instanceof Error ? err.message : "Failed to submit candidate profile";
    throw new Error(msg);
  }
}

export async function fetchCandidates(params?: {
  search?: string;
  category?: string;
  status?: string;
  location?: string;
  experience?: string;
}) {
  const searchParams = new URLSearchParams();
  if (params?.search) searchParams.set("search", params.search);
  if (params?.category) searchParams.set("category", params.category);
  if (params?.status) searchParams.set("status", params.status);
  if (params?.location) searchParams.set("location", params.location);
  if (params?.experience) searchParams.set("experience", params.experience);

  const qs = searchParams.toString();
  const url = `${API_URL}/api/v1/candidates${qs ? `?${qs}` : ""}`;

  try {
    const res = await fetch(url, { cache: "no-store" });
    const json = await res.json();
    if (!res.ok) throw new Error(json.error || "Failed to fetch candidates");
    return json.candidates as CandidateRecord[];
  } catch (err: unknown) {
    // Fallback to Next.js route if express is not direct
    try {
      const fb = await fetch(`/api/candidates${qs ? `?${qs}` : ""}`, { cache: "no-store" });
      const fbJson = await fb.json();
      if (fb.ok) return fbJson.candidates as CandidateRecord[];
    } catch {
      // ignore
    }
    throw err;
  }
}

export async function updateCandidateStatus(
  id: string | number,
  status: string,
  notes?: string
) {
  const url = `${API_URL}/api/v1/candidates/${id}/status`;
  const res = await fetch(url, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status, notes }),
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.error || "Failed to update candidate status");
  return json.candidate as CandidateRecord;
}

export async function deleteCandidate(id: string | number) {
  const url = `${API_URL}/api/v1/candidates/${id}`;
  const res = await fetch(url, {
    method: "DELETE",
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.error || "Failed to delete candidate");
  return json;
}
