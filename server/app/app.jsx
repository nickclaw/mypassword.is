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
                </head>
                <body>
                    <InfiniteScroll>
                        <RouteHandler />
                    </InfiniteScroll>
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
