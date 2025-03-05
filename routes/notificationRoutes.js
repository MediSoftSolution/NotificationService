const express = require("express");
const router = express.Router();
const { sendEmail } = require("../services/emailService");

router.post("/send-email", async (req, res) => {
    const { to, subject, text } = req.body;

    if (!to || !subject || !text) {
        return res.status(400).json({ error: "Tüm alanları doldurun." });
    }

    try {
        await sendEmail(to, subject, text);
        res.json({ message: "E-posta gönderildi." });
    } catch (error) {
        res.status(500).json({ error: "E-posta gönderme hatası." });
    }
});

module.exports = router;
