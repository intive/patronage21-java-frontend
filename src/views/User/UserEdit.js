import React from "react";
import { useRecoilValue } from "recoil";
import { currentUserState } from "../../state/atoms";
import GroupTitle from "../../components/UI/GroupTitle";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import EditableUserHeader from "../../components/User/Edit/EditableUserHeader";
import EditableProjectsList from "../../components/User/Edit/EditableProjectsList";
import EditableContact from "../../components/User/Edit/EditableContact";
import EditableInformation from "../../components/User/Edit/EditableInformation";
import UserEditButtons from "../../components/User/Edit/UserEditButtons";
import { USER_BIO_TITLE } from "../../config/Constants";

function UserEdit() {
  const user = useRecoilValue(currentUserState);

  return (
    <>
      <EditableUserHeader />
      <GroupTitle>{USER_BIO_TITLE}</GroupTitle>
      <EditableInformation />
      <Box my={5}>
        <Grid container spacing={3}>
          <EditableProjectsList val={user.projects} />
          <EditableContact />
          <UserEditButtons />
        </Grid>
      </Box>
    </>
  );
}

export default UserEdit;
