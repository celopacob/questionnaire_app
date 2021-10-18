import React from 'react';
import Link from '../styled/Link';
import CenterDiv from '../styled/CenterDiv';
import styled from 'styled-components';
import Summary from '../components/Summary';

const StyledLink = styled(Link)`
  display: block;
`;

export default function () {
    return (
        <CenterDiv>
            <h1>Summary!!</h1>
            <Summary />
            <StyledLink to="/">Home</StyledLink>
        </CenterDiv>
    );
};