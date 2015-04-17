var goodEntry = {
    password: "password",
    reason: "this is the reason"
};

var badEntry = {

};

describe('the entry endpoint', () => {

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

    describe('GET /api/entry - browse', () => {

    });

    describe('POST /api/entry/:entry - retrieve', () => {

    });

    describe('POST /api/entry/:entry - edit', () => {

    });

    describe('DELETE /api/entry/:edit - delete', () => {

    });
});
