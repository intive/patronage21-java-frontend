import React from 'react';
import Title from './Title';
import Information from './Information';

function TitleContainer(props) {
    return (
        <div>
            <Title title={props.title}></Title>
            <Information info={props.info}></Information>
        </div>
    )
};

export default TitleContainer;