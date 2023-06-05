const { EmailService } = require('../services');
const {StatusCodes} = require('http-status-codes');
const AppError = require('../utils/errors/app-error');
const { SuccessResponse, ErrorResponse } = require('../utils/common');

async function create(req,res) {
    try {
        const response = await EmailService.createTicket({
            subject: req.body.subject,
            content: req.body.content,
            recepientEmail: req.body.recepientEmail
        });
        SuccessResponse.data = response;
        return res
                .status(StatusCodes.OK)
                .json(SuccessResponse);
    } catch(error) {
        ErrorResponse.error = error;
        return res
                .status(StatusCodes.INTERNAL_SERVER_ERROR)
                .json(ErrorResponse);
    }
}

module.exports = {
    create
}