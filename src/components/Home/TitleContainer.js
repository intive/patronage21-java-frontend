import React from 'react';
import PropTypes from 'prop-types';
import Information from '../UI/Information';
import SiteHeader from "../UI/SiteHeader";

function TitleContainer(props) {
    return (
        <>
            <SiteHeader> {props.title}</SiteHeader>
            <Information info={props.info}/>
        </>
    )
};

TitleContainer.propTypes = {
    title: PropTypes.string.isRequired,
    info: PropTypes.string.isRequired
};

export default TitleContainer;