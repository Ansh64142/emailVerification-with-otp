import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "nishant641422@gmail.com",
    pass: "rxgv xbwq fnqy jxta",
  },
});

const sendMail = async () => {
  try {
    const info = await transporter.sendMail({
      from: "nishant641422@gmail.com",
      to: "rajputofficial330@gmail.com",
      subject: "Testing",
      text: "Hello there",
    });

    console.log("Email sent:", info.response);
  } catch (error) {
    console.log(error);
  }
};

sendMail();
