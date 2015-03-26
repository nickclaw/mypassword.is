var React = require('react'),
    Entry = require('../component/entry.jsx'),
    request = require('superagent');

module.exports = React.createClass({

    contextTypes: {
        router: React.PropTypes.func
    },

    statics: {
        willTransitionTo(transition, params, query, callback) {
            request.get(`/api/${params.password}`, function(err, data) {
                params.error = err;
                params.entry = data.body;
                callback();
            })
        }
    },

    getInitialState() {
        return {
            entry: null,
            error: null
        };
    },

    render() {
        if (!this.state.entry) {
            var params = this.context.router.getCurrentParams();
            this.state.entry = params.entry;
            this.state.error = params.error;
        }

        return (
            <Entry entry={this.state.entry}></Entry>
        );
    }
});
