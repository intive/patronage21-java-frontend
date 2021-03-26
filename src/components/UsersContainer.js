import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import SearchInput from './SearchInput';
import SelectInput from './SelectInput';
import UserList from './UserList';

function UsersContainer(props) {
    let leaders = [];
    let candidates = [];
    props.users.forEach(user => user.role === "CANDIDATE" ? candidates.push(user) : leaders.push(user));

    return (
        <div>
            <Box my={5}>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6} md={4}>
                        <SearchInput placeholder="Szukaj użytkownika" ariaLabel="search user" />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <SelectInput techGroups={props.techGroups} />
                    </Grid>
                </Grid>
            </Box>
            <Box my={5}>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                        <UserList title="Liderzy" list={leaders} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <UserList title="Uczestnicy" list={candidates} />
                    </Grid>
                </Grid>
            </Box>
        </div>
    )
};

UsersContainer.propTypes = {
    title: PropTypes.string.isRequired,
    list: PropTypes.object.isRequired,
    placeholder: PropTypes.string.isRequired,
    ariaLabel: PropTypes.string.isRequired,
    techGroups: PropTypes.object.isRequired
};

export default UsersContainer;