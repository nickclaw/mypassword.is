var React = require('react');

module.exports = class Entry extends React.Component {

    render() {
        var entry = this.props.entry;

        // apply entry.view
        var style = { backgroundImage: `url(/static/image/${entry.view.background})` },
            classes = "entry box direction vertical";
        classes += " " + entry.view.type + " " + entry.view.classes.join(" ");


        return (
            <div className={classes} style={style}>
                <div className="password">{entry.password}</div>
                <div className="reason">{entry.reason}</div>
                <ul className="info">
                    <li><a href={`/p/${entry._id}`}>link</a></li>
                    <li><a href="#">share</a></li>
                </ul>
            </div>
        );
    }
}
