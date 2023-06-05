const CrudRepository = require('./crud-repository');
const { Ticket } = require('../models/index');


class TicketRepository extends CrudRepository {
    constructor() {
        super(Ticket);
    }

    async getPendingTickets() {
        const response = await Ticket.findAll({
            where: {
                status: 'PENDING'
            }
        });
        return response;
    }
}

module.exports = TicketRepository;