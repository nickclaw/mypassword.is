import React from 'react';
import {Component} from 'react';
import Expander from './expander';
import request from 'superagent';

export default class Upload extends Component {

    constructor(props) {
        super(props);

        this.state = {
            password: "",
            reason: "",
            image: null
        };
    }

    render() {

        let expandReason = !!this.state.password,
            expandButtons = expandReason && !!this.state.reason;

        return (
            <div className="submitter box direction vertical">
                <h2>Add your password?</h2>
                <form name="form">
                    <div className="field">
                        <input type="text" name="password" onChange={this.onChange.bind(this)} value={this.state.password} placeholder="your password" />
                    </div>

                    <Expander expanded={expandReason}>
                        <div className="field">
                            <textarea name="reason" onChange={this.onChange.bind(this)} value={this.state.reason} placeholder="your story"></textarea>
                        </div>
                    </Expander>

                    <Expander expanded={expandButtons}>
                        <div className="field">
                            <div className="direction horizontal">
                                <label className="flex1" >
                                    <button>upload image</button>
                                    <input type="file" />
                                </label>
                            </div>
                        </div>
                    </Expander>

                    <Expander expanded={expandButtons}>
                        <div className="field" expand="entry.password && entry.reason">
                            <div className="direction horizontal align start">
                                <button className="flex2" onClick={this.onSubmit.bind(this)}>submit</button>
                                <button className="flex1" onClick={this.onClear.bind(this)}>clear</button>
                            </div>
                        </div>
                    </Expander>
                </form>
            </div>
        );
    }

    onChange(evt) {
        this.setState({
            [evt.target.name]: evt.target.value
        });
    }

    onClear(evt) {
        this.setState({
            password: "",
            reason: "",
            image: null
        });
    }

    onSubmit(evt) {
        evt.preventDefault();
        request
            .post('/api/entry')
            .send({
                password: this.state.password,
                reason: this.state.reason,
                view: {
                    background: this.state.image
                }
            })
            .end((err, res) => {
                this.context.router.transitionTo('password', {password: res.body.id});
            })
    }
}

Upload.contextTypes = {
    router: React.PropTypes.func
};
