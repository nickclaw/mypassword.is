import Router from 'express';
import {NotFoundError, NotAllowedError} from './util';
import {FieldValidationError} from 'vlad';

let router = Router();

export default router;

router
    .use('/api', require('./api/') )
    .use('/auth', require('./auth/') )
;
