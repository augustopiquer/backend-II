import mongoose from 'mongoose'
import {nanoid} from 'nanoid'

mongoose.pluralize(null)
const ticketSchema = new mongoose.Schema({
    //id de MongoDB
    code: {
        type: String,
        unique: true,
        default: () => nanoid()
    },
    purchaser: {
        type:String,
        required: true
    },
    products: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                required: true,
                ref: 'products'
            },
            quantity: {
                type: Number,
                required: true,
                min: 1
            }
        }
    ],
    amount: {
        type: Number,
        required: true,
        min: 0
    },
    status: {
        type: String,
        enum: ['pending', 'completed', 'canceled'],
        default: 'pending'
      },
    purchase_datetime: {
        type: Date,
        default:Date.now,
        required: true
    }
})
const TicketModel = mongoose.model('tickets', ticketSchema)
export default TicketModel