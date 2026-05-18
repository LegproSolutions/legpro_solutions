import { NextResponse } from "next/server";

/** Redirects to your deployed CRM. Set NEXT_PUBLIC_CRM_URL in .env.local */
export async function GET(request: Request) {
  const url = process.env.NEXT_PUBLIC_CRM_URL?.trim();
  if (url) {
    return NextResponse.redirect(url);
  }
  const { origin } = new URL(request.url);
  return NextResponse.redirect(`${origin}/crm/configure`);
}
