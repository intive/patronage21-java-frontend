import React from 'react';
import PropTypes from 'prop-types';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import { makeStyles } from '@material-ui/core/styles';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItem from '@material-ui/core/ListItem';
import Avatar from '@material-ui/core/Avatar';
import styled from 'styled-components'

export const UserListTitle = styled.span`
    flex: 1;
    font-weight: 600;
`;

const useStyles = makeStyles(theme => ({
    userListHeader: {
        background: '#eff9ff',
        display: 'flex',
        fontSize: '15px',
        color: theme.palette.primary.main
    }
}));

function UserList(props) {
    const classes = useStyles();

    const createListItem = (user, index, users) =>
        <ListItem key={user.email} divider={index !== users.length - 1}>
            <ListItemAvatar><Avatar /></ListItemAvatar>
            <ListItemText primary={user.firstName + " " + user.lastName} />
        </ListItem>;

    const users = props.list.map((user, index) => createListItem(user, index, props.list));

    return (
        <List subheader={
            <ListSubheader className={classes.userListHeader}>
                <UserListTitle>{props.title}</UserListTitle>
                {props.list.length}
            </ListSubheader>}
            dense={false}>
            {users}
        </List>
    )
};

UserList.propTypes = {
    title: PropTypes.string.isRequired,
    list: PropTypes.array.isRequired
};

UserList.defaultProps = {
    title: "Tytuł",
    list: [
        {
            "firstName": "-",
            "lastName": "-",
            "email": "-",
            "phoneNumber": "-",
            "githubUrl": "-",
            "userName": "-",
            "role": "-",
            "status": "-"
        }
    ],
}

export default UserList;