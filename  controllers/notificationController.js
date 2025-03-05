const sendAppointmentNotification = require('../services/sendAppointmentNotification');

const sendNotifications = async (req, res) => {
    const appointmentDetails = {
        patientName: "Ali Veli",
        doctorName: "Dr. Ahmet Yılmaz",
        date: "2025-03-10",
        time: "10:00"
    };

    const patientEmail = "aliveli@example.com";
    const doctorEmail = "ahmetyilmaz@example.com";

    try {
        await sendAppointmentNotification(patientEmail, doctorEmail, appointmentDetails);
        res.status(200).send("Bildirimler gönderildi!");
    } catch (error) {
        res.status(500).send("Bildirim gönderme hatası!");
    }
};

module.exports = { sendNotifications };
