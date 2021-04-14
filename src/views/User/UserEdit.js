import React from "react";
import GroupTitle from "../../components/UI/GroupTitle";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import EditableUserHeader from "../../components/User/Edit/EditableUserHeader";
import { useState } from "react";
import EditableProjectsList from "../../components/User/Edit/EditableProjectsList";
import EditableContact from "../../components/User/Edit/EditableContact";
import EditableInformation from "../../components/User/Edit/EditableInformation";
import { userEdit } from "../../mocks/userEdit";
import UserEditButtons from "../../components/User/Edit/UserEditButtons";
import { USER_BIO_TITLE } from "../../config/Constants";

function UserEdit() {
  const [user, setUser] = useState(userEdit);
  const [userBeforeEdit, setUserBeforeEdit] = useState(userEdit);
  const [edit, setEdit] = useState(false);

  function onToggleEditMode() {
    setEdit(!edit);
  }

  function saveUserState() {
    setUserBeforeEdit(JSON.parse(JSON.stringify(user)));
  }

  function cancelUserEdit() {
    setUser(userBeforeEdit);
    onToggleEditMode();
  }

  return (
    <>
      <EditableUserHeader user={user} setUser={setUser} edit={edit} />
      <GroupTitle>{USER_BIO_TITLE}</GroupTitle>
      <EditableInformation user={user} setUser={setUser} edit={edit} />
      <Box my={5}>
        <Grid container spacing={3}>
          <EditableProjectsList user={user} setUser={setUser} edit={edit} />
          <EditableContact user={user} setUser={setUser} edit={edit} />
          <UserEditButtons
            edit={edit}
            onToggleEditMode={onToggleEditMode}
            saveUserState={saveUserState}
            cancelUserEdit={cancelUserEdit}
          />
        </Grid>
      </Box>
    </>
  );
}

export default UserEdit;
