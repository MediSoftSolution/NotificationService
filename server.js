const express = require('express');
const path = require('path');
const { registerService } = require('./consul');

const app = express();
const PORT = process.env.PORT || 5000;

// Serve static files (index.html and others) from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Health check endpoint
app.get('/health', (req, res) => {
    res.status(200).send('OK');
});

// Start the server and register with Consul
app.listen(PORT, async () => {
    console.log(`Notification Service running on port ${PORT}`);
    try {
        // Servisi Consul'e kaydet
        await registerService(
            'notification-service',      // Service ID
            'notification-service',      // Service Name
            '127.0.0.1',                 // Service Address (replace with actual IP or hostname)
            PORT,                        // Service Port
            ['notification', 'email']    // Tags (optional)
        );
    } catch (error) {
        console.error('Failed to register service with Consul:', error);
        process.exit(1); // Exit the process with a non-zero status code on failure
    }
});
