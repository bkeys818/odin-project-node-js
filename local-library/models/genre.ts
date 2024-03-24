import { Schema, model } from 'mongoose'

export interface Genre {
    name: string
    url: string
}

const GenreSchema = new Schema<Genre>({
    name: { type: String, minlength: 3, maxlength: 100, required: true },
})

GenreSchema.virtual('url').get(function () {
    return `/catalog/genre/${this._id}`
})

export default model('Genre', GenreSchema)
