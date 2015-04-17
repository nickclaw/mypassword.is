import Entry from "../../server/models/Entry";
import entries from "../fixtures/entries";

var goodEntry = {
    password: "password",
    reason: "this is the reason"
};

var badEntry = {

};

describe('the entry endpoint', () => {

    beforeEach(function() {
        return Entry.create(entries);
    });

    afterEach(function() {
        return Entry.remove({}).exec();
    });

    describe('POST /api/entry - create', () => {

        it('should create an entry', function() {
            return r.post('/api/entry', goodEntry).should.be.fulfilled
                .then((entry) => {
                    expect(entry.id).to.exist;
                    expect(entry).to.shallowDeepEqual(goodEntry);
                    expect(entry.allowed).to.exist;
                    expect(entry.view).to.exist;
                });
        });


        it('should 400 if invalid input', function() {
            return r.post('/api/entry', badEntry).should.be.rejected
                .then(r.hasStatus(400))
                .then((res) => {
                    expect(res.response.body).to.have.keys(['reason', 'password']);
                });
        });
    });

    describe('GET /api/entry?limit=10&after=:entry - browse', () => {

        it('should retrieve the available entries', function() {
            return r.get('/api/entry').should.be.fulfilled
                .then((entries) => {
                    expect(entries).to.be.an.instanceof(Array);
                    expect(entries.length).to.equal(2);
                });
        });

        it('should respect the `limit` query', function() {
            return r.get('/api/entry?limit=1').should.be.fulfilled
                .then((entries) => {
                    expect(entries).to.be.an.instanceof(Array);
                    expect(entries.length).to.equal(1);
                });
        });

        it('should respect the `after` query', function() {
            return r.get(`/api/entry?limit=1&after=${entries[2]._id}`).should.be.fulfilled
                .then((en) => {
                    expect(en).to.be.an.instanceof(Array);
                    expect(en.length).to.equal(1);
                    expect(en[0].id).to.equal(entries[0]._id);
                });
        });

    });

    describe('POST /api/entry/:entry - retrieve', () => {

    });

    describe('POST /api/entry/:entry - edit', () => {

    });

    describe('DELETE /api/entry/:edit - delete', () => {

    });
});
