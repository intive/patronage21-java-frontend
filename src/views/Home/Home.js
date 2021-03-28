import React from 'react';
import TitleContainer from '../../components/Home/TitleContainer';
import UsersContainer from '../../components/Home/UsersContainer';
import * as Constants from '../../config/Constants';
import { users } from '../../mocks/users';
import { techGroups } from '../../mocks/techGroups';

function Home() {
    const title = Constants.HOME_TITLE;
    const info = Constants.HOME_INFO;

    return (
        <>
            <TitleContainer title={title} info={info} />
            <UsersContainer users={users} techGroups={techGroups} />
        </>
    );
}

export default Home;
