import React from 'react';

export default class EntryPage extends React.Component {
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
}
