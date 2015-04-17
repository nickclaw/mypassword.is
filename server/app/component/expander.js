import React from 'react';
import {Component} from 'react';

export default class Expander extends Component {

    constructor(props) {
        super(props);

        this.state ={
            height: 0
        };
    }

    getDefaultProps() {
        return {
            expanded: true
        };
    }

    componentWillReceiveProps(nextProps) {
        let node = React.findDOMNode(this.refs.ruler);
        this.setState({
            height: node && nextProps.expanded ? node.clientHeight + 10 : 0
        });
    }

    render() {
        let className = "expander" + (this.props.expanded ? '' : ' expand-collapsed');

        return (
            <div className={className} style={this.state}>
                <div ref="ruler">
                    {this.props.children}
                </div>
            </div>
        );
    }
}
