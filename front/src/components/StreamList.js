import React, { Component } from 'react';
import { connect } from 'react-redux';
import CenterAlignedDiv from '../styled/CenterAlignedDiv';
import Stream from './Stream';
import { 
    addAnswer, 
    setPersonSummary, 
    setTotalSummary 
} from '../actions';
import { Formik, Form } from 'formik';
import history from '../history';


class StreamList extends Component {
    render() {
        return (
            <Formik
                initialValues={{
                    streams: [],
                    currentPerson: this.props.currentPerson
                }}
                onSubmit={(values) => {
                    console.log("Submiting streams");
                    let data = {
                        person: this.props.person,
                        answers: values.streams
                    }
                    this.props.dispatch(addAnswer(data));
                    this.props.dispatch(setPersonSummary(this.props.person));
                    this.props.dispatch(setTotalSummary());
                    history.push('/summary');
                }}
            >
                {({ values }) => (
                    <Form>
                        <div id="checkbox-group">
                            <p><label>What streaming services do you use?*</label></p>
                        </div>
                        <CenterAlignedDiv>
                            <div role="group" aria-labelledby="checkbox-group">
                                {this.props.streams.map((stream) => (
                                    <Stream key={stream.id} stream={stream} />
                                ))}
                            </div>
                        </CenterAlignedDiv>
                        <button type="submit">Save</button>
                    </Form>
                )}
            </Formik>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        streams: state.streamServiceList,
        person: state.currentPerson
    }
}
export default connect(mapStateToProps)(StreamList);
