const nodemailer = require("nodemailer");
const config = require("../config");

const transporter = nodemailer.createTransport({
    host: config.smtp.host,
    port: config.smtp.port,
    secure: config.smtp.secure,
    auth: {
        user: config.smtp.auth.user,
        pass: config.smtp.auth.pass
    }
});

async function sendEmail(to, subject, text) {
    try {
        let info = await transporter.sendMail({
            from: config.smtp.auth.user,
            to: to,
            subject: subject,
            text: text
        });
        console.log("Email sent: " + info.response);
    } catch (error) {
        console.error("Email sending failed:", error);
    }
}

module.exports = { sendEmail };
