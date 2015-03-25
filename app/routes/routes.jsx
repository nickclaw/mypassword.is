var React = require('react'),
    Router = require('react-router');

var {Route, DefaultRoute, NotFoundRoute, RouteHandler} = Router;

class Main extends React.Component {

    render() {
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

                </main>

                <footer className="box half direction vertical">
                        <p>You've reached - <span>the_end</span></p>
                </footer>
            </div>
        );
    }
}

module.exports = (
    <Route path="/" name="index" handler={Main}>
        <DefaultRoute handler={require('./index.jsx')} />
        <Route path="/p/:id" name="password" handler={require('./password.jsx')} />
        <NotFoundRoute handler={require('./not-found.jsx')} />
    </Route>
)
