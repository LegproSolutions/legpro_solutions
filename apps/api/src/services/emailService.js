import nodemailer from "nodemailer";

export async function sendContactNotification(lead) {
  const host = process.env.SMTP_HOST;
  const port = process.env.SMTP_PORT || 587;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const adminEmail = process.env.ADMIN_EMAIL;

  if (!host || !user || !pass || !adminEmail) {
    console.warn("[EmailService] SMTP credentials or ADMIN_EMAIL missing. Notification email skipped.");
    return false;
  }

  const transporter = nodemailer.createTransport({
    host,
    port: parseInt(port, 10),
    secure: parseInt(port, 10) === 465, // true for 465, false for other ports
    auth: {
      user,
      pass,
    },
  });

  // Extract variables from the message field if concatenated (like on the frontend)
  let phone = "N/A";
  let service = "General Inquiry";
  let userMessage = lead.message;

  const phoneMatch = lead.message.match(/Mobile:\s*([^\s|]+)/i);
  const serviceMatch = lead.message.match(/Service:\s*([^\s|]+[^|]*)/i);
  const descMatch = lead.message.match(/Description:\s*(.*)/i);

  if (phoneMatch) phone = phoneMatch[1];
  if (serviceMatch) service = serviceMatch[1].trim();
  if (descMatch) userMessage = descMatch[1].trim();

  const mailOptions = {
    from: `"LEGPRO Services Notification" <${user}>`,
    to: adminEmail,
    subject: "New Contact Form Enquiry",
    text: `Name: ${lead.firstName} ${lead.lastName || ""}
Email: ${lead.email}
Phone: ${phone}
Subject: ${service}
Message: ${userMessage}
Date & Time: ${lead.createdAt ? new Date(lead.createdAt).toLocaleString() : new Date().toLocaleString()}`,
    html: `
      <h3>New Contact Form Enquiry</h3>
      <table border="0" cellpadding="5" cellspacing="0" style="font-family: sans-serif; font-size: 14px; border-collapse: collapse;">
        <tr>
          <td style="font-weight: bold; width: 120px;">Name:</td>
          <td>${lead.firstName} ${lead.lastName || ""}</td>
        </tr>
        <tr>
          <td style="font-weight: bold;">Email Address:</td>
          <td><a href="mailto:${lead.email}">${lead.email}</a></td>
        </tr>
        <tr>
          <td style="font-weight: bold;">Phone Number:</td>
          <td>${phone}</td>
        </tr>
        <tr>
          <td style="font-weight: bold;">Subject:</td>
          <td>${service}</td>
        </tr>
        <tr>
          <td style="font-weight: bold; vertical-align: top;">Message:</td>
          <td>${userMessage}</td>
        </tr>
        <tr>
          <td style="font-weight: bold;">Date & Time:</td>
          <td>${lead.createdAt ? new Date(lead.createdAt).toLocaleString() : new Date().toLocaleString()}</td>
        </tr>
      </table>
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(`[EmailService] Email sent successfully: ${info.messageId}`);
    return true;
  } catch (error) {
    console.error("[EmailService] Failed to send email notification:", error);
    return false;
  }
}

export async function sendCandidateNotification(candidate) {
  const host = process.env.SMTP_HOST;
  const port = process.env.SMTP_PORT || 587;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const adminEmail = process.env.ADMIN_EMAIL;

  if (!host || !user || !pass || !adminEmail) {
    console.warn("[EmailService] SMTP credentials or ADMIN_EMAIL missing. Candidate notification skipped.");
    return false;
  }

  const transporter = nodemailer.createTransport({
    host,
    port: parseInt(port, 10),
    secure: parseInt(port, 10) === 465,
    auth: {
      user,
      pass,
    },
  });

  const mailOptions = {
    from: `"LEGPRO Services Portal" <${user}>`,
    to: adminEmail,
    subject: `New Candidate Entry for JobMela: ${candidate.fullName}`,
    text: `Full Name: ${candidate.fullName}
Mobile Number: ${candidate.mobileNumber}
Email ID: ${candidate.email}
Current Location: ${candidate.currentLocation}
Highest Qualification: ${candidate.highestQualification}
Resume: ${candidate.resumeFilename || "Not attached"}
Source: Career Page → JobMela Portal
Submitted At: ${candidate.createdAt ? new Date(candidate.createdAt).toLocaleString() : new Date().toLocaleString()}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden;">
        <div style="background: linear-gradient(135deg, #04142B, #1E40FF); padding: 20px; color: white;">
          <h2 style="margin: 0; font-size: 20px;">New JobMela Candidate Registration</h2>
          <p style="margin: 5px 0 0 0; opacity: 0.85; font-size: 13px;">Candidate submitted details from the Career Page entry flow.</p>
        </div>
        <div style="padding: 24px;">
          <table border="0" cellpadding="8" cellspacing="0" style="width: 100%; font-size: 14px; border-collapse: collapse;">
            <tr style="border-bottom: 1px solid #f1f5f9;">
              <td style="font-weight: bold; width: 150px; color: #475569;">Full Name:</td>
              <td style="color: #0f172a; font-weight: 600;">${candidate.fullName}</td>
            </tr>
            <tr style="border-bottom: 1px solid #f1f5f9;">
              <td style="font-weight: bold; color: #475569;">Mobile Number:</td>
              <td style="color: #0f172a;"><a href="tel:${candidate.mobileNumber}">${candidate.mobileNumber}</a></td>
            </tr>
            <tr style="border-bottom: 1px solid #f1f5f9;">
              <td style="font-weight: bold; color: #475569;">Email ID:</td>
              <td style="color: #0f172a;"><a href="mailto:${candidate.email}">${candidate.email}</a></td>
            </tr>
            <tr style="border-bottom: 1px solid #f1f5f9;">
              <td style="font-weight: bold; color: #475569;">Current Location:</td>
              <td style="color: #0f172a;">${candidate.currentLocation}</td>
            </tr>
            <tr style="border-bottom: 1px solid #f1f5f9;">
              <td style="font-weight: bold; color: #475569;">Highest Qualification:</td>
              <td style="color: #0f172a;">${candidate.highestQualification}</td>
            </tr>
            <tr style="border-bottom: 1px solid #f1f5f9;">
              <td style="font-weight: bold; color: #475569;">Resume Attached:</td>
              <td style="color: #0f172a;">${candidate.resumeFilename || "None provided"}</td>
            </tr>
            <tr>
              <td style="font-weight: bold; color: #475569;">Registered At:</td>
              <td style="color: #64748b; font-size: 13px;">${candidate.createdAt ? new Date(candidate.createdAt).toLocaleString() : new Date().toLocaleString()}</td>
            </tr>
          </table>
        </div>
      </div>
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(`[EmailService] Candidate email notification sent successfully: ${info.messageId}`);
    return true;
  } catch (error) {
    console.error("[EmailService] Failed to send candidate email notification:", error);
    return false;
  }
}
