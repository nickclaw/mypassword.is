import React from 'react';
import {Component} from 'react';

export default class Home extends Component {
    render() {
        return (
            <div id="home" className="home box direction vertical">
                <h2 className="blink">passwords</h2>
                <p>
                    We despise them – <br /> yet we imbue them with our
                    hopes and dreams, our dearest memories, our
                    deepest meanings.
                </p>
                <p>They unlock much more than our accounts.</p>
            </div>
        );
    }
}
