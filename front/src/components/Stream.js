import React, { Component } from 'react';
import {connect} from 'react-redux';
import LeftAligned from '../styled/LeftAligned';
import { Field } from 'formik';

class Stream extends Component {
    render() {
        return (
            <LeftAligned>
                <label>
                    <Field type="checkbox" name="streams" value={this.props.stream.id} />
                    {this.props.stream.name}
                </label>
            </LeftAligned>
        );
    }
}
export default connect()(Stream);
