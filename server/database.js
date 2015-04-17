import mongoose from 'mongoose';

let connecting = new Promise((res, rej) => {
    let conn = mongoose.connect('mongodb://' + C.DATABASE.HOST + ':' + C.DATABASE.PORT + '/' + C.DATABASE.NAME, {
        user: C.DATABASE.USER,
        pass: C.DATABASE.PASS
    }, function(err) {
        if (err) return rej(err);
        res(conn);
    });
});

export default connecting;

connecting
    .then(
        () => Log.info('Connected to database: %s', C.DATABASE.NAME),
        () => Log.error('Could not connect to database: %s', C.DATABASE.NAME)
    )
