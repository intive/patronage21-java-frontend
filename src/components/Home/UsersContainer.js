import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import SearchInput from '../UI/SearchInput';
import SelectInput from '../UI/SelectInput';
import UserList from './UserList';
import * as Constants from '../../config/Constants';

function UsersContainer(props) {
    let leaders = [];
    let candidates = [];
    props.users.forEach(user => user.role === Constants.ROLE_CANDIDATE ? candidates.push(user) : leaders.push(user));

    return (
        <>
            <Box my={5}>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6} md={4}>
                        <SearchInput 
                        placeholder={Constants.HOME_SEARCH_PLACEHOLDER} 
                        ariaLabel={Constants.HOME_SEARCH_ARIA_LABEL} />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <SelectInput techGroups={props.techGroups} />
                    </Grid>
                </Grid>
            </Box>
            <Box my={5}>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                        <UserList title={Constants.HOME_LIST_LEADERS_TITLE} list={leaders} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <UserList title={Constants.HOME_LIST_CANDIDATES_TITLE} list={candidates} />
                    </Grid>
                </Grid>
            </Box>
        </>
    )
};

UsersContainer.propTypes = {
    users: PropTypes.array.isRequired,
    techGroups: PropTypes.array.isRequired
};

export default UsersContainer;