import { transporter } from "./email.config.js";
import { Verification_Email_Template } from "./EmailTemplate.js";

export const sendVerificationCode = async (email, verificationCode) => {
  try {
    const response = await transporter.sendMail({
      from: "nishant641422@gmail.com",
      to: email,
      subject: "verify your email",
      text: "verify your email",
      html: Verification_Email_Template.replace("{verificationCode}", verificationCode),
    });
    console.log("email sent successfully", response);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};
