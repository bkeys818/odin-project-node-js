import asyncHandler from 'express-async-handler'
import Book from '../models/book'
import BookInstance from '../models/bookinstance'
import Author from '../models/author'
import Genre from '../models/genre'
import StatusError from '../utils/statusError'

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
    const allBooks = await Book.find({}, 'title author')
        .sort({ title: 1 })
        .populate('author')
        .exec()

    res.render('book-list', { title: 'Book List', book_list: allBooks })
})

// Display detail page for a specific book.
export const bookDetail = asyncHandler(async (req, res, next) => {
    const [book, bookInstances] = await Promise.all([
        Book.findById(req.params.id)
            .populate('author')
            .populate('genre')
            .exec(),
        BookInstance.find({ book: req.params.id }).exec(),
    ])
    if (book === null) {
        // No results.
        const err = new StatusError('Book not found')
        err.status = 404
        return next(err)
    }
    res.render('book-detail', {
        title: book.title,
        book: book,
        book_instances: bookInstances,
    })
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
