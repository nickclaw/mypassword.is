import {mkdirSync, unlinkSync, existsSync} from "fs";
import {join, basename} from "path";
import rimraf from "rimraf";

let dest = join(__dirname, '../..', C.APP.UPLOAD_DIR);

describe.only('the upload endpoint', () => {


    before(function() {
        if (!existsSync(dest)) mkdirSync(dest);
    });

    after(function() {
        rimraf.sync(dest);
    });

    describe('POST /api/upload - image', () => {

        it('should upload a .jpeg', function() {
            return uploadImage(__dirname + '/../fixtures/image.jpeg').should.be.fulfilled
                .then((res) => {
                    expect(res.body).to.have.keys(['image']);
                    return wasUploaded(res.body.image);
                });
        });

        it('should upload a .jpg', function() {
            return uploadImage(__dirname + '/../fixtures/image.jpg').should.be.fulfilled
                .then((res) => {
                    expect(res.body).to.have.keys(['image']);
                    return wasUploaded(res.body.image);
                });
        });

        it('should upload a .png', function() {
            return uploadImage(__dirname + '/../fixtures/image.png').should.be.fulfilled
                .then((res) => {
                    expect(res.body).to.have.keys(['image']);
                    return wasUploaded(res.body.image);
                });
        });
    });
});


function uploadImage(path) {
    let req = request
        .post('/api/upload/image')
        .attach('image', path);

    return Promise.promisify(req.end, req)();
}

function wasUploaded(name) {
    return new Promise((res, rej) => {
        let base = basename(name);
        if (existsSync(join(dest, base))) return res();
        rej();
    });
}
