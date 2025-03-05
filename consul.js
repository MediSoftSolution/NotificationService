const Consul = require('consul');

const consul = new Consul({
    host: 'localhost', // Consul'un çalıştığı host
    port: 8500,        // Consul'un portu
    promisify: true
});

async function registerService() {
    const serviceId = 'notification-service';

    try {
        await consul.agent.service.deregister(serviceId);
        console.log(`[Consul] ${serviceId} deregistered`);

        await consul.agent.service.register({
            id: serviceId,
            name: 'notification-service',
            address: '127.0.0.1', // Servisin çalıştığı host
            port: 3000, // Express'in çalıştığı port
            tags: ['notification', 'email'],
            check: {
                http: 'http://127.0.0.1:3000/health', // Health Check
                interval: '10s'
            }
        });

        console.log(`[Consul] ${serviceId} registered`);
    } catch (error) {
        console.error('Consul Registration Error:', error);
    }
}

module.exports = { registerService };
