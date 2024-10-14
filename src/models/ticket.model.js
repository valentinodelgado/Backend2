import {Schema, model} from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2"
const ticketCollection = "tickets"


const ticketSchema = new Schema({
    code: {
        type: String,
        unique: true
    },
    purchase_datetime:{
        type: Date,
        default: Date.now,
        required: true
    },
    amount: Number,
    purchaser: String
}) 

ticketSchema.plugin(mongoosePaginate)

export const ticketModel = model(ticketCollection, ticketSchema)