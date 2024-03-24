import asyncHandler from 'express-async-handler'
import BookInstance from '../models/bookinstance'

// Display list of all BookInstances.
export const bookinstanceList = asyncHandler(async (req, res, next) => {
    res.send('NOT IMPLEMENTED: BookInstance list')
})

// Display detail page for a specific BookInstance.
export const bookinstanceDetail = asyncHandler(async (req, res, next) => {
    res.send(`NOT IMPLEMENTED: BookInstance detail: ${req.params.id}`)
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
