import React from 'react';
import CenterDiv from '../styled/CenterDiv';
import Link from '../styled/Link';
import PersonForm from '../containers/PersonForm';


export default function () {
    return (
        <CenterDiv>
            <h1>Personal Info</h1>
            <PersonForm />
            <Link to="/">Home</Link>
        </CenterDiv>
    );
};
