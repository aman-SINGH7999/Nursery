import transporter from "../config/mailer.js";

const sendOtpEmail = async (to, otp) => {
  await transporter.sendMail({
    from: `"AnuKrishi Farms" <${process.env.EMAIL_USER}>`,
    to,
    subject: "Your OTP Code",
    html: `
      <div style="font-family: Arial">
        <h2>OTP Verification</h2>
        <p>Your OTP is:</p>
        <h1>${otp}</h1>
        <p>This OTP is valid for 5 minutes.</p>
      </div>
    `,
  });
};


export {
  sendOtpEmail,
}