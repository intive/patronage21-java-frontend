import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components'

const Header = styled.h1`
    color: ${({ theme }) => theme.palette.primary.main};
    font-weight: 600;
`;

function Title(props) {
    return (
        <Header>{props.title}</Header>
    )
};

Title.propTypes = {
    title: PropTypes.string.isRequired
};

Title.defaultProps = {
    title: "Tytuł"
}

export default Title;