import React from 'react';
import {Component} from 'react';
import Expander from './expander';

export default class Upload extends Component {
    render() {
        return (
            <div className="submitter box direction vertical">
                <h2>Add your password?</h2>
                <form name="form">
                    <div className="field">
                        <input type="text" placeholder="your password" />
                    </div>

                    <Expander>
                        <div className="field">
                            <textarea name="reason" placeholder="your story"></textarea>
                        </div>
                    </Expander>

                    <Expander>
                        <div className="field">
                            <div className="direction horizontal">
                                <label className="flex1" >
                                    <span>upload image</span>
                                    <input type="file" />
                                </label>
                            </div>
                        </div>
                    </Expander>

                    <Expander>
                        <div className="field" expand="entry.password && entry.reason">
                            <div className="direction horizontal align start">
                                <button className="flex2">submit</button>
                                <button className="flex1">clear</button>
                            </div>
                        </div>
                    </Expander>
                </form>
            </div>
        );
    }
}
