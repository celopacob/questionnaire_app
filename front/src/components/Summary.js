import React, { Component } from 'react';
import { connect } from 'react-redux';
import CenterAlignedDiv from '../styled/CenterAlignedDiv';
import LeftAligned from '../styled/LeftAligned';



class Summary extends Component {
    render() {
        return (
            <CenterAlignedDiv>
                <LeftAligned>
                    <label>
                        First Name: {this.props.summary.first_name}
                    </label>
                    <label>
                        Middle Initial: {this.props.summary.first_name}
                    </label>
                    <label>
                        Last Name: {this.props.summary.first_name}
                    </label>
                    <label>
                        Email: {this.props.summary.first_name}
                    </label>

                    <label>
                        {/* Music Services Used: 
                        {this.props.summary.answers.map((answer) => (
                            answer.stream_service_name
                        ))} {this.props.summary.first_name} */}
                    </label>
                </LeftAligned>
            </CenterAlignedDiv>
        )
    }
}

const mapStateToProps = (state) => {
    const personSummary = state.summary;
    const totalSummary = state.totalSummary;
    return {
        summary: personSummary,
        totalSummary: totalSummary
    }
}
export default connect(mapStateToProps)(Summary);
