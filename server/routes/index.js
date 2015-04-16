import Router from 'express';
import {NotFoundError, NotAllowedError} from './util';
import {FieldValidationError} from 'vlad';

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
        if ( err instanceof ValidationError ) return res.sendStatus(400);
        if ( err instanceof NotAllowedError ) return res.sendStatus(401)
        if ( err instanceof NotFoundError ) return res.sendStatus(404);

        Log.error(err);

        res.sendStatus(500);
    })
;
