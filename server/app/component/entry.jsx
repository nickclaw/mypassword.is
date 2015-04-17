import React from 'react';
import {Component} from 'react';

export default class Entry extends Component {

    render() {
        let entry = this.props.entry,
            background = entry.view.background;

        // apply entry.view
        let style = background ? { backgroundImage: `url(${background})` } : {},
            classes = "entry box direction vertical";
        classes += " " + entry.view.type + " " + entry.view.classes.join(" ");


        return (
            <div className={classes} style={style}>
                <div className="password">{entry.password}</div>
                <div className="reason">{entry.reason}</div>
                <ul className="info">
                    <li><a href={`/p/${entry.id}`}>link</a></li>
                    <li><a href="#">share</a></li>
                </ul>
            </div>
        );
    }
}
