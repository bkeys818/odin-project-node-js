import { Schema, model, Types, PopulatedDoc, Document } from 'mongoose'
import { type Author } from './author'
import { type Genre } from './genre'

export interface Book {
    title: string
    author: PopulatedDoc<Author & Document>
    summary: string
    isbn: string
    genre?: Types.Array<PopulatedDoc<Genre & Document>>
    url: string
}

const BookSchema = new Schema<Book>({
    title: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: 'Author', required: true },
    summary: { type: String, required: true },
    isbn: { type: String, required: true },
    genre: [{ type: Schema.Types.ObjectId, ref: 'Genre' }],
})

// Virtual for book's URL
BookSchema.virtual('url').get(function () {
    // We don't use an arrow function as we'll need the this object
    return `/catalog/book/${this._id}`
})

export default model('Book', BookSchema)
