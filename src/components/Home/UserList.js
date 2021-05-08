import React from "react";
import PropTypes from "prop-types";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItem from "@material-ui/core/ListItem";
import Avatar from "@material-ui/core/Avatar";
import GroupList from "../UI/GroupList";

function UserList(props) {
  const createListItem = (user, index, users) => (
    <ListItem key={user.email} divider={index !== users.length - 1}>
      <ListItemAvatar>
        <Avatar />
      </ListItemAvatar>
      <ListItemText primary={user.firstName + " " + user.lastName} />
    </ListItem>
  );

  const users = props.list.map((user, index) =>
    createListItem(user, index, props.list)
  );

  return (
    <GroupList counter={props.list.length} title={props.title}>
      {users}
    </GroupList>
  );
}

UserList.propTypes = {
  title: PropTypes.string.isRequired,
  list: PropTypes.array.isRequired,
};

UserList.defaultProps = {
  title: "Tytuł",
  list: [
    {
      firstName: "-",
      lastName: "-",
      email: "-",
      phoneNumber: "-",
      githubUrl: "-",
      userName: "-",
      role: "-",
      status: "-",
    },
  ],
};

export default UserList;
