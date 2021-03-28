import React from 'react';
import PropTypes from 'prop-types';

function Information(props) {
    return (
        <p>{props.info}</p>
    )
};

Information.propTypes = {
    info: PropTypes.string.isRequired
};

Information.defaultProps = {
    info: "Informacja"
}

export default Information;