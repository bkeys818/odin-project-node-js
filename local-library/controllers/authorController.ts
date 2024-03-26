import asyncHandler from 'express-async-handler'
import Author from '../models/author'
import Book from '../models/book'
import StatusError from '../utils/statusError'

// Display list of all Authors.

export const authorList = asyncHandler(async (req, res, next) => {
    const allAuthors = await Author.find().sort({ family_name: 1 }).exec()
    res.render('author-list', {
        title: 'Author List',
        author_list: allAuthors,
    })
})

// Display detail page for a specific Author.
export const authorDetail = asyncHandler(async (req, res, next) => {
    const [author, authorBooks] = await Promise.all([
        Author.findById(req.params.id).exec(),
        Book.find({ author: req.params.id }).exec(),
    ])
    if (author === null) {
        // No results.
        const err = new StatusError('Author not found')
        err.status = 404
        return next(err)
    }
    res.render('author-detail', {
        title: 'Author Detail',
        author,
        author_books: authorBooks,
    })
})

// Display Author create form on GET.
export const authorCreateGet = asyncHandler(async (req, res, next) => {
    res.send('NOT IMPLEMENTED: Author create GET')
})

// Handle Author create on POST.
export const authorCreatePost = asyncHandler(async (req, res, next) => {
    res.send('NOT IMPLEMENTED: Author create POST')
})

// Display Author delete form on GET.
export const authorDeleteGet = asyncHandler(async (req, res, next) => {
    res.send('NOT IMPLEMENTED: Author delete GET')
})

// Handle Author delete on POST.
export const authorDeletePost = asyncHandler(async (req, res, next) => {
    res.send('NOT IMPLEMENTED: Author delete POST')
})

// Display Author update form on GET.
export const authorUpdateGet = asyncHandler(async (req, res, next) => {
    res.send('NOT IMPLEMENTED: Author update GET')
})

// Handle Author update on POST.
export const authorUpdatePost = asyncHandler(async (req, res, next) => {
    res.send('NOT IMPLEMENTED: Author update POST')
})
