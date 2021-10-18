import React from 'react';
import Link from '../styled/Link';
import CenterDiv from '../styled/CenterDiv';
import styled from 'styled-components';

const StyledLink = styled(Link)`
  display: block;
`;

export default function () {
    return (
        <CenterDiv>
            <div></div>
            <h1>Welcome to the Application</h1>
            <StyledLink to="/personal-info">Let's get started!</StyledLink>
        </CenterDiv>
    );
};