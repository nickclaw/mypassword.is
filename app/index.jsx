var React = require('react'),
    Router = require('react-router'),
    Request = require('superagent').Request;

// load routes
var routes = require('./routes/routes.jsx');

// autorender if on clientside
// otherwise expose middleware for server side rendering
if (typeof window !== 'undefined') {

    Router.run(routes, Router.HistoryLocation, (Handler) => {
        React.render(<Handler user={window.__user}/>, document.body);
    });

} else {

    // for server side rendering api calls won't work
    // unless we prepend all urls with the local address
    var oldFn = Request.prototype.request;
    Request.prototype.request = function() {
        this.url = C.SERVER.HOST + ':' + C.SERVER.PORT + this.url;
        return oldFn.apply(this, arguments);
    }

    module.exports = (req, res) => {
        Router.run(routes, req.url, (Handler, state) => {
            res.render(__dirname + '/template.ejs', {
                content: React.renderToString(<Handler user={req.user}/>),
                user: req.user ? JSON.stringify(req.user) : 'null'
            });
        });
    };
}
