import { Schema, model } from 'mongoose'

export interface Author {
    first_name: string
    family_name: string
    name: string
    date_of_birth?: Date
    date_of_death?: Date
    url: string
}

const AuthorSchema = new Schema<Author>({
    first_name: { type: String, require: true, maxLength: 100 },
    family_name: { type: String, required: true, maxLength: 100 },
    date_of_birth: { type: Date },
    date_of_death: { type: Date },
})

// Virtual for author's full name
AuthorSchema.virtual('name').get(function () {
    let fullname = ''
    if (this.first_name && this.family_name) {
        fullname = `${this.family_name}, ${this.first_name}`
    }
    return fullname
})

// Virtual for author's URL
AuthorSchema.virtual('url').get(function () {
    return `/catalog/author/${this._id}`
})

export default model('Author', AuthorSchema)
