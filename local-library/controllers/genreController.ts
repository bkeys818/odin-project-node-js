import asyncHandler from 'express-async-handler'
import Genre from '../models/genre'
import Book from '../models/book'
import StatusError from '../utils/statusError'

// Display list of all Genre.
export const genreList = asyncHandler(async (req, res, next) => {
    const allGenres = await Genre.find().exec()
    res.render('genre-list', {
        title: 'Book Instance List',
        genre_list: allGenres,
    })
})

// Display detail page for a specific Genre.
export const genreDetail = asyncHandler(async (req, res, next) => {
    const [genre, booksInGenre] = await Promise.all([
        Genre.findById(req.params.id).exec(),
        Book.find({ genre: req.params.id }, 'title summary').exec(),
    ])
    if (genre === null) {
        // No results.
        const err = new StatusError('Genre not found')
        err.status = 404
        return next(err)
    }
    res.render('genre-detail', {
        title: 'Genre Detail',
        genre: genre,
        genre_books: booksInGenre,
    })
})

// Display Genre create form on GET.
export const genreCreateGet = asyncHandler(async (req, res, next) => {
    res.send('NOT IMPLEMENTED: Genre create GET')
})

// Handle Genre create on POST.
export const genreCreatePost = asyncHandler(async (req, res, next) => {
    res.send('NOT IMPLEMENTED: Genre create POST')
})

// Display Genre delete form on GET.
export const genreDeleteGet = asyncHandler(async (req, res, next) => {
    res.send('NOT IMPLEMENTED: Genre delete GET')
})

// Handle Genre delete on POST.
export const genreDeletePost = asyncHandler(async (req, res, next) => {
    res.send('NOT IMPLEMENTED: Genre delete POST')
})

// Display Genre update form on GET.
export const genreUpdateGet = asyncHandler(async (req, res, next) => {
    res.send('NOT IMPLEMENTED: Genre update GET')
})

// Handle Genre update on POST.
export const genreUpdatePost = asyncHandler(async (req, res, next) => {
    res.send('NOT IMPLEMENTED: Genre update POST')
})
