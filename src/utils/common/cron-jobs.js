const cron = require('node-cron');

const { EmailService } = require('../../services');

function scheduleCrons() {
    cron.schedule('*/30 * * * *', async () => {
        await EmailService.connectQueue();
    });
}

module.exports = scheduleCrons;