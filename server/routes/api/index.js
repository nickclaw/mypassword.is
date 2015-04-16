import {Router} from 'express';
import entryRouter from './entry-router'

let router = Router();

export default router;

router
    //
    // subroutes
    //

    .use('/entry', entryRouter);
