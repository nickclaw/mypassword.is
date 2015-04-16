import createError from 'error-factory';

export let NotAuthorizedError = createError('NotAuthorizedError', {
    message: "Not authorized"
});

export let NotFoundError = createError('NotFoundError', {
    message: "Not found"
});

export function auth(req, res, next) {

}
