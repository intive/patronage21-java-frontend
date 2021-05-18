import React, { Suspense } from "react";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import CircularProgress from "@material-ui/core/CircularProgress";
import UsersSearchInput from "./UsersSearchInput";
import TechGroupSelectInput from "./TechGroupSelectInput";
import UserListsContainer from "./UserListsContainer";

const circularProgress = (
  <Box
    display="flex"
    width="100%"
    height="100%"
    alignItems="center"
    justifyContent="center"
  >
    <CircularProgress size={20} />
  </Box>
);

function UsersContainer() {
  return (
    <>
      <Box my={5}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={4}>
            <UsersSearchInput />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Suspense fallback={circularProgress}>
              <TechGroupSelectInput />
            </Suspense>
          </Grid>
        </Grid>
      </Box>
      <Suspense fallback={circularProgress}>
        <UserListsContainer />
      </Suspense>
    </>
  );
}

export default UsersContainer;
