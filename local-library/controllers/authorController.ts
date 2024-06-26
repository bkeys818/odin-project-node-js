import asyncHandler from 'express-async-handler'
import { body, validationResult } from 'express-validator'
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
    res.render('author-form', { title: 'Create Author' })
})

// Handle Author create on POST.
export const authorCreatePost = [
    body('first_name')
        .trim()
        .isLength({ min: 1 })
        .escape()
        .withMessage('First name must be specified.')
        .isAlphanumeric()
        .withMessage('First name has non-alphanumeric characters.'),
    body('family_name')
        .trim()
        .isLength({ min: 1 })
        .escape()
        .withMessage('Family name must be specified.')
        .isAlphanumeric()
        .withMessage('Family name has non-alphanumeric characters.'),
    body('date_of_birth', 'Invalid date of birth')
        .optional({ values: 'falsy' })
        .isISO8601()
        .toDate(),
    body('date_of_death', 'Invalid date of death')
        .optional({ values: 'falsy' })
        .isISO8601()
        .toDate(),
    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req)
        const author = new Author({
            first_name: req.body.first_name,
            family_name: req.body.family_name,
            date_of_birth: req.body.date_of_birth,
            date_of_death: req.body.date_of_death,
        })
        if (!errors.isEmpty()) {
            res.render('author-form', {
                title: 'Create Author',
                author,
                errors: errors.array(),
            })
        } else {
            await author.save()
            res.redirect(author.url)
        }
    }),
]
// Display Author delete form on GET.
export const authorDeleteGet = asyncHandler(async (req, res, next) => {
    // Get details of author and all their books (in parallel)
    const [author, allBooksByAuthor] = await Promise.all([
        Author.findById(req.params.id).exec(),
        Book.find({ author: req.params.id }, 'title summary').exec(),
    ])

    if (author === null) {
        // No results.
        res.redirect('/catalog/authors')
    }

    res.render('author-delete', {
        title: 'Delete Author',
        author: author,
        author_books: allBooksByAuthor,
    })
})

// Handle Author delete on POST.
export const authorDeletePost = asyncHandler(async (req, res, next) => {
    // Get details of author and all their books (in parallel)
    const [author, allBooksByAuthor] = await Promise.all([
        Author.findById(req.params.id).exec(),
        Book.find({ author: req.params.id }, 'title summary').exec(),
    ])

    if (allBooksByAuthor.length > 0) {
        // Author has books. Render in same way as for GET route.
        res.render('author-delete', {
            title: 'Delete Author',
            author: author,
            author_books: allBooksByAuthor,
        })
        return
    } else {
        // Author has no books. Delete object and redirect to the list of authors.
        await Author.findByIdAndDelete(req.body.authorid)
        res.redirect('/catalog/authors')
    }
})

// Display Author update form on GET.
export const authorUpdateGet = asyncHandler(async (req, res, next) => {
    const author = await Author.findById(req.params.id).exec()
    if (author === null) {
        const err = new StatusError('Book instance not found')
        err.status = 404
        return next(err)
    }
    res.render('author-form', { title: 'Update Author', author })
})

// Handle Author update on POST.
export const authorUpdatePost = [
    body('first_name')
        .trim()
        .isLength({ min: 1 })
        .escape()
        .withMessage('First name must be specified.')
        .isAlphanumeric()
        .withMessage('First name has non-alphanumeric characters.'),
    body('family_name')
        .trim()
        .isLength({ min: 1 })
        .escape()
        .withMessage('Family name must be specified.')
        .isAlphanumeric()
        .withMessage('Family name has non-alphanumeric characters.'),
    body('date_of_birth', 'Invalid date of birth')
        .optional({ values: 'falsy' })
        .isISO8601()
        .toDate(),
    body('date_of_death', 'Invalid date of death')
        .optional({ values: 'falsy' })
        .isISO8601()
        .toDate(),
    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req)
        const author = new Author({
            _id: req.params.id,
            first_name: req.body.first_name,
            family_name: req.body.family_name,
            date_of_birth: req.body.date_of_birth,
            date_of_death: req.body.date_of_death,
        })
        if (!errors.isEmpty()) {
            res.render('author-form', {
                title: 'Update Author',
                author,
                errors: errors.array(),
            })
        } else {
            const updatedAuthor = await Author.findByIdAndUpdate(
                req.params.id,
                author,
                {},
            )
            res.redirect(updatedAuthor!.url)
        }
    }),
]
