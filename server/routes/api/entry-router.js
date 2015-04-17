import Router from 'express'
import vlad from 'vlad'
import {auth, NotFoundError} from '../util'
import Entry from '../../models/Entry'

let router = Router();

export default router;

router

    .param('entry', (req, res, next, id) => {
        Entry.findById(id).exec()
            .then((entry) => {
                if (!entry) throw NotFoundError();
                req.params.entry = entry;
            })
            .nodeify(next);
    })

    .get('/',

        // verify req.query
        vlad.middleware({
            limit: vlad.integer.min(0).max(25).default(10).catch,
            after: vlad.string
        }),

        // get req.query.added
        (req, res, next) => {
            if (!req.query.after) {
                req.query.added = Date.now();
                return next();
            }

            Entry.findById(req.query.after).exec()
                .then((entry) => {
                    if (!entry) throw NotFoundError();
                    req.params.entry = entry;
                })
                .nodeify(next);
        },

        // query and return
        (req, res, next) => {
            Entry
                .find({
                    allowed: true,
                    added: { $lt: req.query.added }
                })
                .limit(req.query.limit);
        }
    )

    .post('/', protect('create'), (req, res, next) => {
        let entry = new Entry(req.body);
        entry.save((err) => {
            if (err) return next(err);
            res.send(entry.toJSON());
        });
    })

    .get('/:entry', (req, res, next) => {
        let entry = req.params.entry;
        res.send(entry.toJSON());
    })

    .post('/:entry', auth, protect('edit'), (req, res, next) => {
        let entry = req.params.entry;
        entry.set(req.body);
        entry.save(next);
    })

    .delete('/:entry', auth, (req, res, next) => {
        let entry = req.params.entry;
        entry.remove(next);
    });

function protect(action) {
    return (req, res, next) => {
        req.body = Entry.screen(req.body, action);
        next();
    }
}
