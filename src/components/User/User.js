import React, { useEffect } from "react";
import GroupTitle from "../UI/GroupTitle";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import EditableUserHeader from "../User/Edit/EditableUserHeader";
import EditableProjectsList from "../User/Edit/EditableProjectsList";
import EditableContact from "../User/Edit/EditableContact";
import EditableInformation from "../User/Edit/EditableInformation";
import UserEditButtons from "../User/Edit/UserEditButtons";
import { USER_BIO_TITLE } from "../../config/Constants";
import { useRecoilValue, useRecoilState, useSetRecoilState } from "recoil";
import { setUserProperties } from "../../state/selectors";
import CircleProgressBar from "../UI/CircleProgressBar";
import {
  currentUserState,
  userLoadedState,
  userProperty,
} from "../../state/atoms";
import { getUser } from "../../client/client";

function User() {
  const setCurrentUser = useSetRecoilState(currentUserState);
  const login = useRecoilValue(userProperty("login"));
  const [userLoaded, setUserLoaded] = useRecoilState(userLoadedState);
  const setUserDetails = useSetRecoilState(setUserProperties);

  useEffect(() => {
    async function fetchUser() {
      setCurrentUser(await getUser(login));
      setUserLoaded(true);
      setUserDetails();
    }
    fetchUser();
  }, [login, setCurrentUser, setUserLoaded, setUserDetails]);

  return userLoaded ? (
    <>
      <EditableUserHeader />
      <GroupTitle>{USER_BIO_TITLE}</GroupTitle>
      <EditableInformation />
      <Box my={5}>
        <Grid container spacing={3}>
          <EditableProjectsList />
          <EditableContact />
          <UserEditButtons />
        </Grid>
      </Box>
    </>
  ) : (
    <Box my={25}>
      <CircleProgressBar size={200} />
    </Box>
  );
}

export default User;
