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
import { useRecoilValue, useRecoilState } from "recoil";
import { userQuery } from "../../state/selectors";
import { currentUserState, userProperty } from "../../state/atoms";

function User() {
  const [currentUser, setCurrentUser] = useRecoilState(currentUserState);
  const login = useRecoilValue(userProperty("login"));
  const user = useRecoilValue(userQuery(login));

  useEffect(() => {
    setCurrentUser(user);
  }, [user, setCurrentUser]);

  return (
    <>
      {currentUser.login && (
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
      )}
    </>
  );
}

export default User;
