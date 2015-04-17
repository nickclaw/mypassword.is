import React from 'react';
import {Component} from 'react';

export default class Expander extends Component {

    getDefaultProps() {
        return {
            expanded: true
        };
    }

    render() {
        let node = React.findDOMNode(this.refs.ruler),
            className = "expander" + (this.props.expanded ? '' : ' expand-collapsed'),
            style = { height: node ? node.clientHeight : 0 };

        return (
            <div className={className} style={style}>
                <div ref="ruler">
                    {this.props.children}
                </div>
            </div>
        );
    }
}
