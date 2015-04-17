import Router from 'express';
import {FieldValidationError, GroupValidationError} from 'vlad';
import {Form} from 'multiparty';
import fs from 'fs';
import path from 'path';

let router = Router(),
    form = new Form({
        autoFiles: true
    });

export default router;

router

    .post('/upload',
        getFile,
        identifyImage,
        validateImage,
        convertImage,
        saveImage,
        sendResponse
    );

//
// Functions
//

function getFile(req, res, next) {
    form.parse(req, function(err, fields, files) {

        // parse form for file data
        if (err) return next(err);
        if (!files.image || !files.image.length) return next(createError("No file uploaded."));

        let location = files.image[0].path,
            remove = function() {
                fs.unlink(location, function noop(){/* nooooope */});
            }

        req.file = { location, remove };

        next();
    })
}

function identifyImage(req, res, next) {
    req.file.image = gm(req.file.location);
    req.file.image.identify(function(err, data) {
        if (err) return next(createError("Invalid image file. " + err.message));
        req.file.info = data;
        next();
    });
}

function validateImage(req, res, next) {
    let data = req.file.data;

    if (data.format !== 'PNG' && data.format !== 'JPEG') {
        return next(vlad.FieldValidationError("Invalid file type."));
    }

    // size checks?

    if (data.size.width < 1280) {
        return next(createError(`Not at least 1280px wide, only ${data.size.width}px.`));
    }

    if (data.size.height < 720) {
        return next(createError(`Not at least 720px tall, only ${data.size.height}px.`));
    }

    next();
}

function convertImage(req, res, next) {
    var image = req.file.image;
    image.strip()
        .resize('1920', '1080')
        .interlace('Plane')
        .quality(85)
        .toBuffer(function(err, buffer) {
            if (err) return next(createError('Unable to save image.'));
            req.file.buffer = buffer;
            next();
        });
}

function saveImage(req, res, next) {
    // clear temp file
    req.file.remove();
    delete req.file.location;
    delete req.file.remove;
    delete req.file.info;

    let name = Date.now() + '.jpg',
        dest = path.join(ROOT, C.APP.RES_DIR, 'upload', name);

    fs.writeFile(dest, req.file.buffer, next);
}

function sendResponse(req, res, next) {
    res.send({ image: path.join('/static/upload/', name) });
}

function createError(message) {
    return GroupValidationError("Invalid object.", {
        image: FieldValidationError(message)
    });
}
