const express = require('express');
const { registerService } = require('./consul');

const app = express();
const PORT = process.env.PORT || 5000;

app.get('/health', (req, res) => {
    res.status(200).send('OK');
});

app.listen(PORT, async () => {
    console.log(`Notification Service running on port ${PORT}`);
    await registerService();
});
