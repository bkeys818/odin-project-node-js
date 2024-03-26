import asyncHandler from 'express-async-handler'
import BookInstance from '../models/bookinstance'
import StatusError from '../utils/statusError'

// Display list of all BookInstances.
export const bookinstanceList = asyncHandler(async (req, res, next) => {
    const allBookInstances = await BookInstance.find().populate('book').exec()

    res.render('bookinstance-list', {
        title: 'Book Instance List',
        bookinstance_list: allBookInstances,
    })
})

// Display detail page for a specific BookInstance.
export const bookinstanceDetail = asyncHandler(async (req, res, next) => {
    const bookInstance = await BookInstance.findById(req.params.id)
        .populate('book')
        .exec()
    if (bookInstance === null) {
        // No results.
        const err = new StatusError('Genre not found')
        err.status = 404
        return next(err)
    }
    res.render('bookinstance-detail', {
        title: 'Book: ',
        bookinstance: bookInstance,
    })
})

// Display BookInstance create form on GET.
export const bookinstanceCreateGet = asyncHandler(async (req, res, next) => {
    res.send('NOT IMPLEMENTED: BookInstance create GET')
})

// Handle BookInstance create on POST.
export const bookinstanceCreatePost = asyncHandler(async (req, res, next) => {
    res.send('NOT IMPLEMENTED: BookInstance create POST')
})

// Display BookInstance delete form on GET.
export const bookinstanceDeleteGet = asyncHandler(async (req, res, next) => {
    res.send('NOT IMPLEMENTED: BookInstance delete GET')
})

// Handle BookInstance delete on POST.
export const bookinstanceDeletePost = asyncHandler(async (req, res, next) => {
    res.send('NOT IMPLEMENTED: BookInstance delete POST')
})

// Display BookInstance update form on GET.
export const bookinstanceUpdateGet = asyncHandler(async (req, res, next) => {
    res.send('NOT IMPLEMENTED: BookInstance update GET')
})

// Handle bookinstance update on POST.
export const bookinstanceUpdatePost = asyncHandler(async (req, res, next) => {
    res.send('NOT IMPLEMENTED: BookInstance update POST')
})
