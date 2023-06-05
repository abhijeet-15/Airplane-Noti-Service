const {StatusCodes} = require('http-status-codes');
const { TicketRepository } = require('../repositories');
const { Mailer } = require('../config');
const AppError = require('../utils/errors/app-error');
const { ServerConfig } = require('../config')
const amqplib = require('amqplib');

const ticketRepository = new TicketRepository();

async function createTicket(data) {
    try {
        const response = await ticketRepository.create(data);
        return response;
    } catch (error) {
        console.log(error);
        throw new AppError('Cannot create a new ticket object',
            StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getPendingEmails() {
    try {
        const response = await ticketRepository.getPendingTickets();
        return response;
    } catch (error) {
        console.log(error);
        throw new AppError('Cannot get the pending ticket',
            StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function sendEmail(mailFrom, mailTo, subject, text) {
    try {
        const response = await Mailer.sendMail({
            from: mailFrom,
            to: mailTo,
            subject: subject,
            text: text
        });

        return response;
    } catch (error) {
        console.log(error);
        throw new AppError('Cannot create a new ticket object',
            StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function connectQueue() {
    let connection, channel;
    try {
        console.log("connectQueue function called");
        connection = await amqplib.connect(ServerConfig.RABBIT_MQ);
        channel = await connection.createChannel();
        await channel.assertQueue(ServerConfig.NOTIFICATION_QUEUE);
        channel.consume(ServerConfig.NOTIFICATION_QUEUE, async (data) => {
            //console.log(`${Buffer.from(data.content)}`);
            const object = JSON.parse(`${Buffer.from(data.content)}`);
            await sendEmail(ServerConfig.GMAIL_EMAIL, object.recepientEmail, object.subject, object.text);
            channel.ack(data);
        })
    } catch (error) {
        console.log(error);
    }
}


module.exports = {
    createTicket,
    getPendingEmails,
    sendEmail,
    connectQueue
}