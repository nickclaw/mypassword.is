import Entry from "../../server/models/Entry";
import entries from "../fixtures/entries";

var goodEntry = {
    password: "hello world",
    reason: "this is a better reason"
};

var badEntry = {
    password: "",
    reason: ""
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

        it('should retrieve the entry', function() {
            let entry = entries[0];

            return r.get(`/api/entry/${entry._id}`).should.be.fulfilled
                .then((e) => {
                    expect(e).to.have.keys(['id', 'reason', 'password', 'allowed', 'view']);
                    expect(e.id).to.equal(entry._id);
                    expect(e.reason).to.equal(entry.reason);
                    expect(e.password).to.equal(entry.password);
                });
        });

        it('should 404 if the entry doesn\'t exist', function() {
            return r.get(`/api/entry/notanentry`).should.be.rejected
                .then(r.hasStatus(404));
        });

    });

    describe('POST /api/entry/:entry - edit', () => {

        var entry = entries[0];

        it('should edit the entry', function() {
            r.login(true);
            return r.post(`/api/entry/${entry._id}`, goodEntry).should.be.fulfilled
                .then(r.logout)
                .then((e) => {
                    expect(e).to.shallowDeepEqual(goodEntry);
                })
        });

        it('should return 400 if a bad edit is made', function() {
            r.login(true);
            return r.post(`/api/entry/${entry._id}`, badEntry).should.be.rejected
                .then(r.logout)
                .then(r.hasStatus(400))
                .then((res) => {
                    expect(res.response.body).to.have.keys(['reason', 'password']);
                });
        });

        it('should return 401 if not authorized', function() {
            return r.post(`/api/entry/${entry._id}`, goodEntry).should.be.rejected
                .then(r.hasStatus(401));
        });

        it('should return 404 if editing an unknown entry', function() {
            r.login(true);
            return r.post(`/api/entry/asdfasd`, goodEntry).should.be.rejected
                .then(r.logout)
                .then(r.hasStatus(404));
        });

    });

    describe('DELETE /api/entry/:edit - delete', () => {

        var entry = entries[0];

        it('should delete the entry', function() {
            r.login(true);
            return r.del(`/api/entry/${entry._id}`).should.be.fulfilled
                .then(r.logout)
                .then((e) => {
                    delete e['id'];
                    expect(entry).to.shallowDeepEqual(e);
                })
        });

        it('should return 401 if not authorized', function() {
            return r.del(`/api/entry/${entry._id}`).should.be.rejected
                .then(r.hasStatus(401));
        });

        it('should return 404 if deleting an unknown entry', function() {
            r.login(true);
            return r.del(`/api/entry/asdfasd`).should.be.rejected
                .then(r.logout)
                .then(r.hasStatus(404));
        });
    });
});
