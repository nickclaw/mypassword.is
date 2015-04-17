import React from 'react';
import {Component, render} from 'react';

class App extends Component {
    render() {
        return (
            <html>
                <head>
                    <title>mypassword.is</title>
                </head>
                <body>
                    <h1>Hello</h1>
                </body>
            </html>
        );
    }
}

if (typeof window !== 'undefined') {
    render(<App />, document);
}

export default App;
