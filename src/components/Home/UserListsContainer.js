import React from "react";
import { useRecoilValue } from "recoil";
import { usersQuery } from "../../state/selectors";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import UserList from "./UserList";
import {
  ROLE_CANDIDATE,
  ROLE_LEADER,
  HOME_LIST_LEADERS_TITLE,
  HOME_LIST_CANDIDATES_TITLE,
} from "../../config/Constants";

function UserListsContainer() {
  const candidates = useRecoilValue(usersQuery(ROLE_CANDIDATE));
  const leaders = useRecoilValue(usersQuery(ROLE_LEADER));

  return (
    <Box my={5}>
      <Grid container spacing={3}>
        <UserList title={HOME_LIST_LEADERS_TITLE} list={leaders} />
        <UserList title={HOME_LIST_CANDIDATES_TITLE} list={candidates} />
      </Grid>
    </Box>
  );
}

export default UserListsContainer;
