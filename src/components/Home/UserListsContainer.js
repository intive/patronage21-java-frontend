import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { usersQuery } from "../../state/selectors";
import { activeViewState, viewChangedState } from "../../state/atoms";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import UserList from "./UserList";
import {
  ROLE_CANDIDATE,
  ROLE_LEADER,
  HOME_LIST_LEADERS_TITLE,
  HOME_LIST_CANDIDATES_TITLE,
} from "../../config/Constants";
import { getUsers } from "../../client/client";
import CircleProgressBar from "../UI/CircleProgressBar";

function UserListsContainer() {
  const activeView = useRecoilValue(activeViewState);
  const viewChanged = useRecoilValue(viewChangedState);
  const [usersLoaded, setUsersLoaded] = useState(true);
  const [candidates, setCandidates] = useState(
    useRecoilValue(usersQuery(ROLE_CANDIDATE))
  );
  const [leaders, setLeaders] = useState(
    useRecoilValue(usersQuery(ROLE_LEADER))
  );

  useEffect(() => {
    if (viewChanged) {
      setUsersLoaded(false);
      async function fetchUsers() {
        setCandidates(await getUsers(ROLE_CANDIDATE));
        setLeaders(await getUsers(ROLE_LEADER));
        setUsersLoaded(true);
      }
      fetchUsers();
    }
  }, [activeView, viewChanged]);

  return usersLoaded ? (
    <Box my={5}>
      <Grid container spacing={3}>
        <UserList title={HOME_LIST_LEADERS_TITLE} list={leaders} />
        <UserList title={HOME_LIST_CANDIDATES_TITLE} list={candidates} />
      </Grid>
    </Box>
  ) : (
    <CircleProgressBar />
  );
}

export default UserListsContainer;
