import {mkdirSync, unlinkSync, existsSync} from "fs";
import {join, basename} from "path";
import rimraf from "rimraf";

let dest = join(__dirname, '../..', C.APP.UPLOAD_DIR);

describe('the upload endpoint', () => {


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

        it('should return 400 on skinny image', function() {
            return uploadImage(__dirname + '/../fixtures/image.skinny.jpg').should.be.rejected
                .then(r.hasStatus(400))
                .then((res) => {
                    expect(res.response.body).to.have.keys(['image']);
                });
        });

        it('should return 400 on short image', function() {
            return uploadImage(__dirname + '/../fixtures/image.short.jpg').should.be.rejected
                .then(r.hasStatus(400))
                .then((res) => {
                    expect(res.response.body).to.have.keys(['image']);
                });
        });

        it('should return 400 on invalid type', function() {
            return uploadImage(__dirname + '/../fixtures/entries.json').should.be.rejected
                .then(r.hasStatus(400))
                .then((res) => {
                    expect(res.response.body).to.have.keys(['image']);
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
