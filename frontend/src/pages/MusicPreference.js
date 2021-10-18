import React from 'react';
import Link from '../styled/Link';
import CenterDiv from '../styled/CenterDiv';
import styled from 'styled-components';
import StreamList from '../components/StreamList';

const StyledLink = styled(Link)`
  display: block;
`;

export default function () {
    return (
        <CenterDiv>
            <h1>Music Preference!</h1>
            <StreamList />
            <StyledLink to="/">Home</StyledLink>
        </CenterDiv>
    );
};