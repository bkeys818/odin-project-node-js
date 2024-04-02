import asyncHandler from 'express-async-handler'
import { body, validationResult } from 'express-validator'
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
    res.render('genre-form', { title: 'Create Genre' })
})

// Handle Genre create on POST.
export const genreCreatePost = [
    body('name', 'Genre name must contain at least 3 characters')
        .trim()
        .isLength({ min: 3 })
        .escape(),
    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req)
        const genre = new Genre({ name: req.body.name })
        if (!errors.isEmpty()) {
            res.render('genre-form', {
                title: 'Create Genre',
                genre: genre,
                errors: errors.array(),
            })
        } else {
            await genre.save()
            res.redirect(genre.url)
        }
    }),
]

// Display Genre delete form on GET.
export const genreDeleteGet = asyncHandler(async (req, res, next) => {
    const [genre, allBooksOfGenre] = await Promise.all([
        Genre.findById(req.params.id).exec(),
        Book.find({ genre: req.params.id }, 'title summary').exec(),
    ])

    if (genre === null) {
        // No results.
        res.redirect('/catalog/genres')
    }

    res.render('genre-delete', {
        title: 'Delete Genre',
        genre: genre,
        genre_books: allBooksOfGenre,
    })
})

// Handle Genre delete on POST.
export const genreDeletePost = asyncHandler(async (req, res, next) => {
    const [genre, allBooksByGenre] = await Promise.all([
        Genre.findById(req.params.id).exec(),
        Book.find({ genre: req.params.id }, 'title summary').exec(),
    ])

    if (allBooksByGenre.length > 0) {
        res.render('genre-delete', {
            title: 'Delete Genre',
            genre: genre,
            genre_books: allBooksByGenre,
        })
    } else {
        await Genre.findByIdAndDelete(req.body.genreid)
        res.redirect('/catalog/genres')
    }
})

// Display Genre update form on GET.
export const genreUpdateGet = asyncHandler(async (req, res, next) => {
    const genre = await Genre.findById(req.params.id)
    if (genre === null) res.redirect('/catalog/genres')
    res.render('genre-form', { genre })
})

// Handle Genre update on POST.
export const genreUpdatePost = [
    body('name', 'Genre name must contain at least 3 characters')
        .trim()
        .isLength({ min: 3 })
        .escape(),
    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req)
        const genre = new Genre({ name: req.body.name, _id: req.params.id })
        if (!errors.isEmpty()) {
            res.render('genre-form', { genre, errors: errors.array() })
            return
        } else {
            const updatedBook = await Genre.findByIdAndUpdate(
                req.params.id,
                genre,
                {},
            )
            res.redirect(updatedBook!.url)
        }
    }),
]
