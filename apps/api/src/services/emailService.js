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
