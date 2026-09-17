import { transporter } from "./email.config.js";

export const sendVerificationCode = async (email, verificationCode) => {
  try {
    const response = await transporter.sendMail({
      from: "nishant641422@gmail.com",
      to: email,
      subject: "verify your email",
      text: "verify your email",
      html: verificationCode,
    });
    console.log("email sent successfully", response);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};
