const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

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
