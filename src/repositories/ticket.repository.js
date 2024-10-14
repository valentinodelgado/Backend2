import TicketDao from "../dao/ticket.dao.js"

const ticketDao = new TicketDao()

class TicketRepository{
    async createTicket(data){
        return ticketDao.save(data)
    }
}

export default TicketRepository