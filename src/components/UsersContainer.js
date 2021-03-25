import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import Grid from '@material-ui/core/Grid';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import SearchInput from './SearchInput';
import SelectInput from './SelectInput';
import UserList from './UserList';

function UsersContainer(props) {
    let leaders = [];
    let candidates = [];

    const createListItem = (user, index, users) =>
        <ListItem key={user.email} divider={index !== users.length - 1 ? true : false}>
            <ListItemAvatar><Avatar /></ListItemAvatar>
            <ListItemText primary={user.firstName + " " + user.lastName} />
        </ListItem>;

    props.users.forEach(user => user.role === "CANDIDATE" ? candidates.push(user) : leaders.push(user));
    candidates = candidates.map((user, index) => createListItem(user, index, candidates));
    leaders = leaders.map((user, index) => createListItem(user, index, leaders));

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

export default UsersContainer;