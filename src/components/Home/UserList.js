import React from "react";
import { useSetRecoilState, useResetRecoilState } from "recoil";
import PropTypes from "prop-types";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItem from "@material-ui/core/ListItem";
import Avatar from "@material-ui/core/Avatar";
import GroupList from "../UI/GroupList";
import {
  activeViewState,
  userProperty,
  usersSearchValueState,
  techGroupSelectValueState,
  viewChangedState,
} from "../../state/atoms";
import styled from "styled-components";
import { makeStyles } from "@material-ui/core";
import { IMAGE_BASE64_JPG_PREFIX } from "../../config/Constants";

const UserListItem = styled(ListItem)`
  &:hover {
    cursor: pointer;
    background-color: ${({ theme }) =>
      theme.customPalette.colors.listItemHovered};
  }
`;

const styles = makeStyles((theme) => ({
  tableLeft: {
    marginRight: 2,
  },
  tableRight: {
    color: theme.customPalette.text.secondary,
    textAlign: "right",
    fontStyle: "italic",
    marginLeft: 2,
  },
}));

function UserList(props) {
  const classes = styles();
  const setLogin = useSetRecoilState(userProperty("login"));
  const setActiveView = useSetRecoilState(activeViewState);
  const setViewChanged = useSetRecoilState(viewChangedState);
  const resetUsersSearchValue = useResetRecoilState(usersSearchValueState);
  const resetTechGroupSelectValue = useResetRecoilState(
    techGroupSelectValueState
  );

  const handleClick = (login) => () => {
    setLogin(login);
    setActiveView("user");
    setViewChanged(true);
    resetUsersSearchValue();
    resetTechGroupSelectValue();
  };

  const createListItem = (user, index, users) => (
    <UserListItem
      key={user.login}
      divider={index !== users.length - 1}
      onClick={handleClick(user.login)}
    >
      <ListItemAvatar>
        <Avatar
          alt={user.firstName}
          src={IMAGE_BASE64_JPG_PREFIX + user.image}
        />
      </ListItemAvatar>
      <ListItemText className={classes.tableLeft} primary={user.firstName + " " + user.lastName} />
      <ListItemText className={classes.tableRight} primary={`(${user.login})`} />
    </UserListItem>
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
