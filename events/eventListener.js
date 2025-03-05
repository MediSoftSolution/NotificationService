const axios = require("axios");
const { sendEmail } = require("../services/emailService");

function setupEventListeners(io) {
    console.log("📡 Hastane API'den gelecek event'ler dinleniyor...");

    setInterval(async () => {
        try {
            // 📌 Hastane API'den randevu ve lab sonuçlarını çekiyoruz
            const response = await axios.get("http://localhost:4000/notifications");

            response.data.forEach((event) => {
                if (event.type === "appointment_created") {
                    io.to(event.doctorId).emit("receiveNotification", "Yeni randevunuz var!");
                    sendEmail(event.doctorEmail, "Yeni Randevu", "Yeni bir hasta randevu aldı.");
                } else if (event.type === "lab_result_ready") {
                    io.to(event.patientId).emit("receiveNotification", "Laboratuvar Sonucunuz Hazır!");
                    sendEmail(event.patientEmail, "Laboratuvar Sonucu", "Sonuçlarınızı sistemden kontrol edebilirsiniz.");
                }
            });
        } catch (error) {
            console.error("❌ Hastane API'den veri çekme hatası:", error);
        }
    }, 5000); // 5 saniyede bir kontrol
}

module.exports = { setupEventListeners };