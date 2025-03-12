const Consul = require('consul');

const consul = new Consul({
    host: 'localhost',
    port: 8500,
    promisify: true // Enable promise-based API
});

async function registerService(serviceId, serviceName, serviceAddress, servicePort, tags = []) {
    try {
        // Register the service with Consul
        await consul.agent.service.register({
            id: serviceId,
            name: serviceName,
            address: serviceAddress,
            port: servicePort,
            tags: tags,
            check: {
                http: `http://${serviceAddress}:${servicePort}/health`,
                interval: '10s' // Health check interval
            }
        });

        console.log(`[Consul] ${serviceId} registered`);
    } catch (error) {
        console.error(`Consul Registration Error for ${serviceId}:`, error);
        throw error; // Propagate the error up if needed
    }
}

async function deregisterService(serviceId) {
    try {
        // Deregister any existing service with the same ID (if exists)
        await consul.agent.service.deregister(serviceId);
        console.log(`[Consul] ${serviceId} deregistered`);
    } catch (error) {
        console.error(`Consul Deregistration Error for ${serviceId}:`, error);
        throw error; // Propagate the error up if needed
    }
}

module.exports = { registerService, deregisterService };
