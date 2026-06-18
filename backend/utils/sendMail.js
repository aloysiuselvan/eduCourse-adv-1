const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: parseInt(process.env.EMAIL_PORT),
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendVerificationEmail = async (email, fullname, token) => {
  const verificationUrl = `${process.env.APP_BASE_URL}/auth/verifikasi-email?token=${token}`;

  const mailOptions = {
    from: `"EduCourse App" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Verifikasi Email - EduCourse App",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>Halo, ${fullname}!</h2>
        <p>Terima kasih telah mendaftar di <strong>EduCourse App</strong>.</p>
        <p>Silakan klik tombol di bawah ini untuk memverifikasi email Anda:</p>
        <a href="${verificationUrl}" 
           style="display: inline-block; padding: 12px 24px; background-color: #4CAF50; color: white; text-decoration: none; border-radius: 8px; font-weight: bold;">
           Verifikasi Email
        </a>
        <p style="margin-top: 20px; color: #666;">Atau salin link berikut ke browser Anda:</p>
        <p style="word-break: break-all; color: #1a73e8;">${verificationUrl}</p>
        <hr style="margin-top: 30px; border: none; border-top: 1px solid #eee;" />
        <p style="color: #999; font-size: 12px;">Email ini dikirim secara otomatis. Mohon jangan membalas email ini.</p>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = { sendVerificationEmail };
