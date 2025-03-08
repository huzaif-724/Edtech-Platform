const nodemailer = require("nodemailer");

const mailSender = async (email, subject, body) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      secure: false,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"SmartLearn" <${process.env.MAIL_USER}>`,
      to: email,
      subject,
      html: body,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent successfully: ", info.response);
    return info;
  } catch (error) {
    console.error("Error sending email: ", error.message);
    throw error;
  }
};

module.exports = mailSender;
