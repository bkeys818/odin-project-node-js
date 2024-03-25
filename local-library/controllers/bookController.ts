import asyncHandler from 'express-async-handler'
import Book from '../models/book'
import BookInstance from '../models/bookinstance'
import Author from '../models/author'
import Genre from '../models/genre'

export const index = asyncHandler(async (req, res, next) => {
    const [
        numBooks,
        numBookInstances,
        numAvailableBookInstances,
        numAuthors,
        numGenres,
    ] = await Promise.all([
        Book.countDocuments({}).exec(),
        BookInstance.countDocuments({}).exec(),
        BookInstance.countDocuments({ status: 'Available' }).exec(),
        Author.countDocuments({}).exec(),
        Genre.countDocuments({}).exec(),
    ])

    res.render('index', {
        title: 'Local Library Home',
        book_count: numBooks,
        book_instance_count: numBookInstances,
        book_instance_available_count: numAvailableBookInstances,
        author_count: numAuthors,
        genre_count: numGenres,
    })
})

// Display list of all books.
export const bookList = asyncHandler(async (req, res, next) => {
    res.send('NOT IMPLEMENTED: Book list')
})

// Display detail page for a specific book.
export const bookDetail = asyncHandler(async (req, res, next) => {
    res.send(`NOT IMPLEMENTED: Book detail: ${req.params.id}`)
})

// Display book create form on GET.
export const bookCreateGet = asyncHandler(async (req, res, next) => {
    res.send('NOT IMPLEMENTED: Book create GET')
})

// Handle book create on POST.
export const bookCreatePost = asyncHandler(async (req, res, next) => {
    res.send('NOT IMPLEMENTED: Book create POST')
})

// Display book delete form on GET.
export const bookDeleteGet = asyncHandler(async (req, res, next) => {
    res.send('NOT IMPLEMENTED: Book delete GET')
})

// Handle book delete on POST.
export const bookDeletePost = asyncHandler(async (req, res, next) => {
    res.send('NOT IMPLEMENTED: Book delete POST')
})

// Display book update form on GET.
export const bookUpdateGet = asyncHandler(async (req, res, next) => {
    res.send('NOT IMPLEMENTED: Book update GET')
})

// Handle book update on POST.
export const bookUpdatePost = asyncHandler(async (req, res, next) => {
    res.send('NOT IMPLEMENTED: Book update POST')
})
