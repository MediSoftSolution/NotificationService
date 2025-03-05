const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const notificationRoutes = require("./routes/notificationRoutes");

dotenv.config();
const app = express();
app.use(bodyParser.json());

// API route'ları ekleyelim
app.use("/notifications", notificationRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});