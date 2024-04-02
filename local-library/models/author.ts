import { Schema, model } from 'mongoose'
import { DateTime } from 'luxon'

export interface Author {
    first_name: string
    family_name: string
    name: string
    date_of_birth?: Date
    date_of_birth_form_value?: string
    date_of_death?: Date
    date_of_death_form_value?: string
    liftspan: string
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

AuthorSchema.virtual('lifespan').get(function () {
    return (
        (this.date_of_death
            ? DateTime.fromJSDate(this.date_of_death).toLocaleString(
                  DateTime.DATE_MED,
              )
            : '') +
        ' - ' +
        (this.date_of_birth
            ? DateTime.fromJSDate(this.date_of_birth).toLocaleString(
                  DateTime.DATE_MED,
              )
            : '')
    )
})

AuthorSchema.virtual('date_of_birth_form_value').get(function () {
    return this.date_of_birth
        ? DateTime.fromJSDate(this.date_of_birth).toISODate()
        : ''
})

AuthorSchema.virtual('date_of_death_form_value').get(function () {
    return this.date_of_death
        ? DateTime.fromJSDate(this.date_of_death).toISODate()
        : ''
})

export default model('Author', AuthorSchema)
