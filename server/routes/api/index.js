import {Router} from 'express';
import entryRouter from './entry-router';
import uploadRouter from './upload-router';

let router = Router();

export default router;

router
    //
    // subroutes
    //

    .use('/entry', entryRouter)
    .use('/upload', uploadRouter);
