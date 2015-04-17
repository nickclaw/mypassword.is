import Router from 'express';
import {NotFoundError, NotAuthorizedError, ValidationError} from './util';

let router = Router();

export default router;

router
    .use('/api', require('./api/') )
    .use('/auth', require('./auth/') )

    //
    // Handle errors
    //

    .use((req, res, next) => {
        Log.silly("Route not found %s %s", req.method, req.originalUrl);
        res.send(501);
    })
    .use((err, req, res, next) => {
        if ( err instanceof ValidationError ) return res.status(400).send(err.toJSON());
        if ( err instanceof NotAuthorizedError ) return res.sendStatus(401)
        if ( err instanceof NotFoundError ) return res.sendStatus(404);

        next(err);
    })
    .use((err, req, res, next) => {
        Log.error(err);
        res.sendStatus(500);
    })
;
