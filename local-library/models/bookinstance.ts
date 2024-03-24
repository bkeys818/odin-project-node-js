import { Schema, model, PopulatedDoc, Document } from 'mongoose'
import { type Book } from './book'

export interface BookInstance {
    book: PopulatedDoc<Book & Document>
    imprint: string
    status: 'Available' | 'Maintenance' | 'Loaned' | 'Reserved'
    due_back?: Date
    url: string
}

const BookInstanceSchema = new Schema<BookInstance>({
    book: { type: Schema.Types.ObjectId, ref: 'Book', required: true },
    imprint: { type: String, required: true },
    status: {
        type: String,
        required: true,
        enum: ['Available', 'Maintenance', 'Loaned', 'Reserved'],
        default: 'Maintenance',
    },
    due_back: { type: Date, default: Date.now },
})

// Virtual for bookinstance's URL
BookInstanceSchema.virtual('url').get(function () {
    return `/catalog/bookinstance/${this._id}`
})

export default model('BookInstance', BookInstanceSchema)
