import nodemailer from "nodemailer";
import dotenv from "dotenv";
import { VERIFICATION_EMAIL_TEMPLATE } from "./emailTempletes.js"; // Import the template

dotenv.config();

const { NODEMAILER_HOST, NODEMAILER_PORT, NODEMAILER_USER, NODEMAILER_PASS } =
  process.env;

  

const transport = nodemailer.createTransport({
  host: NODEMAILER_HOST || "smtp.mailtrap.io", // Default Mailtrap host
  port: NODEMAILER_PORT || 587, // Default Mailtrap port
  auth: {
    user: NODEMAILER_USER, // Username from Mailtrap
    pass: NODEMAILER_PASS, // Password or API token from Mailtrap
  },
});

const sender = {
  address: "hello@demomailtrap.com",
  name: "Mailtrap Test",
};

export const sendVerificationOptToken = async (email, verificationOtpToken) => {
  const recipient = email; // Use plain string for recipient email

  // Replace the placeholder with the actual verification token
  const emailContent = VERIFICATION_EMAIL_TEMPLATE.replace(
    "{verificationCode}",
    verificationOtpToken
  );

  try {
    const response = await transport.sendMail({
      from: `${sender.name} <${sender.address}>`,
      to: recipient,
      subject: "Verify Your Email",
      html: emailContent, // Use the template with replaced token
    });

    // console.log("Email sent successfully:", response);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};







// // Update the following transport configuration to match your domain's email settings
// const transport = nodemailer.createTransport({
//   host: NODEMAILER_HOST || "smtp.yourdomain.com", // Replace with your SMTP host (e.g., smtp.yourdomain.com)
//   port: NODEMAILER_PORT || 465, // Typically, 465 for SSL or 587 for TLS. Update as per your email provider.
//   secure: NODEMAILER_PORT == 465, // true for 465 (SSL), false for 587 (TLS or STARTTLS)
//   auth: {
//     user: NODEMAILER_USER, // Replace with your email address (e.g., noreply@yourdomain.com)
//     pass: NODEMAILER_PASS, // Replace with your email password or API key for authentication
//   },
// });

// const sender = {
//   address: "noreply@yourdomain.com", // Replace with your domain's email address
//   name: "Your App Name", // Replace with your application's name
// };

// export const sendVerificationOptToken = async (email, verificationOtpToken) => {
//   const recipient = email; // Use plain string for recipient email

//   // Replace the placeholder with the actu al verification token
//   const emailContent = VERIFICATION_EMAIL_TEMPLATE.replace(
//     "{verificationCode}",
//     verificationOtpToken
//   );

//   try {
//     const response = await transport.sendMail({
//       from: `${sender.name} <${sender.address}>`, // Ensure sender details reflect your domain
//       to: recipient,
//       subject: "Verify Your Email",
//       html: emailContent, // Use the template with replaced token
//     });

//     console.log("Email sent successfully:", response);
//   } catch (error) {
//     console.error("Error sending email:", error);
//   }
// };
