import React from 'react';
import ReactAsync from 'react-async';
import {decorate as Mixin} from 'react-mixin';
import req from 'superagent';
import Entry from '../component/entry.jsx';


@Mixin(ReactAsync.Mixin)
export default class EntryPage extends React.Component {

    getInitialStateAsync(done) {
        // let params = this.context.router.getCurrentParams();

        req.get(`/api/entry/EJfFIoYW`)
            .end((err, res) => {
                if (err) return done(err);
                done(null, {
                    entry: res.body
                });
            });
    }

    render() {
        return (
            <Entry entry={this.state.entry}></Entry>
        );
    }
}


EntryPage.contextTypes = {
    router: React.PropTypes.func
}
