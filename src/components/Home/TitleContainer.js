import React from 'react';
import PropTypes from 'prop-types';
import Title from './Title';
import Information from './Information';

function TitleContainer(props) {
    return (
        <>
            <Title title={props.title}></Title>
            <Information info={props.info}></Information>
        </>
    )
};

TitleContainer.propTypes = {
    title: PropTypes.string.isRequired,
    info: PropTypes.string.isRequired
};

export default TitleContainer;