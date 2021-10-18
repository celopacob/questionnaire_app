import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addPerson } from '../actions';
import history from '../history';

class PersonForm extends Component {
    handleSubmit = (e) => {
        e.preventDefault();
        const first_name = this.getFirstName.value;
        const middle_initial = this.getMiddleInitial.value;
        const last_name = this.getLastName.value;
        const email = this.getEmail.value;
        const person = {
            first_name,
            middle_initial,
            last_name,
            email
        }
        this.props.dispatch(addPerson(this.props.dispatch, person));
        history.push('/music-preference');

    }
    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <p><label>What's your first name?*</label></p>
                    <input required type="text" ref={(input) => this.getFirstName = input}
                        placeholder="Fisrt Name" /><br /><br />

                    <p><label>Middle initial</label></p>
                    <input type="text" ref={(input) => this.getMiddleInitial = input}
                        placeholder="Middle Initial (Optional)" /><br /><br />

                    <p><label>What's your last name?*</label></p>
                    <input required type="text" ref={(input) => this.getLastName = input}
                        placeholder="Last Name" /><br /><br />

                    <p><label>What's your email?*</label></p>
                    <input required type="text" ref={(input) => this.getEmail = input}
                        placeholder="E-mail" /><br /><br />
                    <button>Save</button>
                </form>
            </div>
        );
    }
}
export default connect()(PersonForm);