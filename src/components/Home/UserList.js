import React from "react";
import { useSetRecoilState } from "recoil";
import PropTypes from "prop-types";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItem from "@material-ui/core/ListItem";
import Avatar from "@material-ui/core/Avatar";
import GroupList from "../UI/GroupList";
import { activeViewState, userProperty } from "../../state/atoms";
import styled from "styled-components";

const UserListItem = styled(ListItem)`
  &:hover {
    background-color: ${({ theme }) =>
      theme.customPalette.colors.listItemHovered};
  }
`;

function UserList(props) {
  const setLogin = useSetRecoilState(userProperty("login"));
  const setActiveView = useSetRecoilState(activeViewState);
  const handleClick = (login) => () => {
    setActiveView("user");
    setLogin(login);
  };

  const createListItem = (user, index, users) => (
    <UserListItem
      key={user.login}
      divider={index !== users.length - 1}
      onClick={handleClick(user.login)}
    >
      <ListItemAvatar>
        <Avatar />
      </ListItemAvatar>
      <ListItemText primary={user.firstName + " " + user.lastName} />
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
