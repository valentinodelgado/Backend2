import { calculateTotalPrice, uniqueCode } from "../../utils/cartUtils.js";
import TicketRepository from "../../repositories/ticket.repository.js";

const ticketRepository = new TicketRepository()

class TicketManager{
    async generateTicket(products,req){
        const totalPrice = await calculateTotalPrice(products)
        const code = uniqueCode() 
        ticketRepository.createTicket({
            code: code,
            amount: parseInt(totalPrice),
            purchaser: req.user.email
        })
        return "Ticket creado"
    }
}

export default TicketManager