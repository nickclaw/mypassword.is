var React = require('react'),
    {Link} = require('react-router');

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
                    <li><Link to={`/p/${entry._id}`}>link</Link></li>
                    <li><a to="#">share</a></li>
                </ul>
            </div>
        );
    }
}
