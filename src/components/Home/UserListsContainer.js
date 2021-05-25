import React, { useEffect, useState, useRef } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { usersQuery, setLastResponseState } from "../../state/selectors";
import {
  activeViewState,
  viewChangedState,
  usersSearchValueState,
  techGroupSelectValueState,
} from "../../state/atoms";
import { checkSearchAlerts } from "../../alerts/alertSelectors";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import UserList from "./UserList";
import {
  ROLE_CANDIDATE,
  ROLE_LEADER,
  HOME_SEARCH_NO_RESULTS,
  HOME_LIST_LEADERS_TITLE,
  HOME_LIST_CANDIDATES_TITLE,
} from "../../config/Constants";
import { getUsers } from "../../client/client";
import CircleProgressBar from "../UI/CircleProgressBar";
import styled from "styled-components";

export const NoResults = styled.div`
  text-align: center;
  font-size: 20px;
  width: 100%;
  margin: 40px 0;
`;

function UserListsContainer() {
  const activeView = useRecoilValue(activeViewState);
  const viewChanged = useRecoilValue(viewChangedState);
  const searchedUserData = useRecoilValue(usersSearchValueState);
  const selectedGroup = useRecoilValue(techGroupSelectValueState);
  const [usersLoaded, setUsersLoaded] = useState(true);
  const setResponse = useSetRecoilState(setLastResponseState);
  const setSearchAlerts = useSetRecoilState(checkSearchAlerts);
  const firstUpdate = useRef(true);
  const [candidatesResponse, setCandidatesResponse] = useState(
    useRecoilValue(usersQuery(ROLE_CANDIDATE))
  );
  const [leadersResponse, setLeadersResponse] = useState(
    useRecoilValue(usersQuery(ROLE_LEADER))
  );

  useEffect(() => {
    if (firstUpdate.current && !viewChanged) {
      firstUpdate.current = false;
      return;
    }
    setUsersLoaded(false);
    async function fetchUsers() {
      const searchParams = [searchedUserData, selectedGroup];
      setCandidatesResponse(await getUsers(ROLE_CANDIDATE, ...searchParams));
      setLeadersResponse(await getUsers(ROLE_LEADER, ...searchParams));
      setUsersLoaded(true);
    }
    fetchUsers();
  }, [activeView, viewChanged, searchedUserData, selectedGroup]);

  useEffect(() => {
    setResponse(candidatesResponse);
    setSearchAlerts("candidates");
  }, [candidatesResponse, setSearchAlerts, setResponse]);

  useEffect(() => {
    setResponse(leadersResponse);
    setSearchAlerts("leaders");
  }, [leadersResponse, setSearchAlerts, setResponse]);

  const candidates = candidatesResponse.body.users;
  const leaders = leadersResponse.body.users;
  return usersLoaded ? (
    <Box my={5}>
      <Grid container spacing={3}>
        {candidates.length > 0 || leaders.length > 0 ? (
          <>
            <UserList title={HOME_LIST_LEADERS_TITLE} list={leaders} />
            <UserList title={HOME_LIST_CANDIDATES_TITLE} list={candidates} />
          </>
        ) : (
          <NoResults>{HOME_SEARCH_NO_RESULTS}</NoResults>
        )}
      </Grid>
    </Box>
  ) : (
    <CircleProgressBar />
  );
}

export default UserListsContainer;
