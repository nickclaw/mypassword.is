var React = require('react');

module.exports = React.createClass({

    getInitialState() {
        return {
            entries: null,
            canLoad: true,
            error: null
        };
    },

    render() {
        return (
            <header>
                <div className="home box direction vertical">
                    <h2 className="blink">passwords</h2>
                    <p>
                        We despise them – <br /> yet we imbue them with our
                        hopes and dreams, our dearest memories, our
                        deepest meanings.
                    </p>
                    <p>They unlock much more than our accounts.</p>
                </div>
            </header>
        );
    }
});
