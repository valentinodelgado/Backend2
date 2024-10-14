import {ticketModel} from "../models/ticket.model.js"

class TicketDao{
    async save(data){
        const ticket = new ticketModel(data)
        return await ticket.save()
    }
}

export default TicketDao