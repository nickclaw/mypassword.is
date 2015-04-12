var React = require('react'),
    InfiniteScroll = require('react-infinite-scroll')(React),
    Router = require('react-router'),
    Entry = require('../component/entry.jsx'),
    request = require('superagent');

var {Route, DefaultRoute, NotFoundRoute, RouteHandler} = Router;

var Main = React.createClass({

    getInitialState() {
        return {
            entries: null,
            after: null,
            error: null,
            canLoad: true
        };
    },

    contextTypes: {
        router: React.PropTypes.func
    },

    statics: {
        willTransitionTo(transition, params, query, callback) {
            var after = params.password || null;

            var url = after ? `/api/?after=${after}` : '/api/';
            request.get(url, function(err, data) {
                if (err) return callback(err);
                params.entries = data.body || [];
                params.after = params.entries[params.entries.length - 1]._id;
                callback();
            })
        }
    },

    render: function() {
        if (!this.state.entries) {
            var params = this.context.router.getCurrentParams();
            this.state.entries = params.entries;
            this.state.after = params.after;
        }

        var entries = this.state.entries.map(entry => (
            <Entry entry={entry} key={entry._id}></Entry>
        ));

        return (
            <InfiniteScroll id="container"
                className="box strict"
                loadMore={this.loadMore}
                hasMore={this.state.canLoad}
                threshold={750} >

                <nav id="nav">
                    <a href="/">home</a>
                    <a href="/submit">submit</a>
                    <a href="/faq">faq</a>
                    <a href="/terms">legal</a>
                </nav>

                <header>
                    <RouteHandler />
                </header>

                <main>
                    {entries}
                </main>

                <footer className="box half direction vertical">
                    <p>You've reached - <span>the_end</span></p>
                </footer>
            </InfiniteScroll>
        );
    },

    loadMore() {
        this.setState({
            canLoad: false
        });

        var url = this.state.after ? `/api/?after=${this.state.after}` : '/api/';
        request.get(url, function(err, data) {
            if (err) {
                return this.setState({
                    error: err
                });
            }

            var length = data.body.length,
                last = data.body[length - 1];

            this.setState({
                entries: this.state.entries.concat(data.body),
                after: last ? last._id : null,
                canLoad: length > 0
            });
        }.bind(this));
    }
});

module.exports = (
    <Route path="/" name="index" handler={Main}>
        <DefaultRoute handler={require('./index.jsx')} />
        <Route path="/p/:password" name="password" handler={require('./password.jsx')} />
        <NotFoundRoute handler={require('./not-found.jsx')} />
    </Route>
)
