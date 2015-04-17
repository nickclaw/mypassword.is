import React from 'react';
import {Component, render} from 'react';
import Router from 'react-router';
import {run, Route, DefaultRoute, NotFoundRoute, RouteHandler} from 'react-router';
import ReactAsync from 'react-async';

let InfiniteScroll = require('react-infinite-scroll')(React);
require('react/lib/ReactMount').allowFullPageRender = true;
let isClient = typeof window !== 'undefined';

class App extends Component {
    render() {
        return (
            <html>
                <head>
                    <title>mypassword.is</title>
                    <link href="/static/style/index.css" type="text/css" rel="stylesheet" />
                </head>
                <body>
                    <InfiniteScroll>
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
                            <main>

                            </main>
                        </main>

                        <footer className="box half direction vertical">
                            <p>You've reached - <span>the_end</span></p>
                        </footer>
                    </InfiniteScroll>
                    <script src="/static/app.js" async></script>
                </body>
            </html>
        );
    }
}

let routes = (
    <Route handler={App} path="/">
        <DefaultRoute handler={ require('./page/home.jsx') } />
        <Route path="/p/:password" name="password" handler={require('./page/entry.jsx')} />
        <NotFoundRoute handler={require('./page/404.jsx')} />
    </Route>
);

if (isClient) {
    run(routes, Router.HistoryLocation, function (Handler) {
        render(<Handler/>, document);
    });
}

export default routes;
