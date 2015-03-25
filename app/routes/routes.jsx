var React = require('react'),
    Router = require('react-router'),
    request = require('superagent'),
    Entry = require('../component/Entry.jsx');

var {Route, DefaultRoute, NotFoundRoute, RouteHandler} = Router;

class Main extends React.Component {

    constructor() {
        super();
        this.state = null;
    }

    render() {
        if (!this.state) {
            this.state = this.context.router.getCurrentParams();
        }

        var sections = this.state.entries.map(value => (
            <Entry entry={value}></Entry>
        ));

        return (
            <div id="container" className="box strict">

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
                    {sections}
                </main>

                <footer className="box half direction vertical">
                        <p>You've reached - <span>the_end</span></p>
                </footer>
            </div>
        );
    }
}

Main.contextTypes = {
    router: React.PropTypes.func
};

Main.willTransitionTo = function(transition, params, query, callback) {
    request.get('/api/', function(err, data) {
        if (err) return callback(err);
        params.entries = data.body;
        callback();
    });
};

module.exports = (
    <Route path="/" name="index" handler={Main}>
        <DefaultRoute handler={require('./index.jsx')} />
        <Route path="/p/:id" name="password" handler={require('./password.jsx')} />
        <NotFoundRoute handler={require('./not-found.jsx')} />
    </Route>
)
