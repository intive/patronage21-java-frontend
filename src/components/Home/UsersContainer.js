import React, { Suspense } from "react";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import UsersSearchInput from "./UsersSearchInput";
import TechGroupSelectInput from "./TechGroupSelectInput";
import UserListsContainer from "./UserListsContainer";
import CircleProgressBar from "../UI/CircleProgressBar";

function UsersContainer() {
  return (
    <>
      <Box my={5}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={4}>
            <UsersSearchInput />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Suspense fallback={<CircleProgressBar />}>
              <TechGroupSelectInput />
            </Suspense>
          </Grid>
        </Grid>
      </Box>
      <Suspense fallback={<CircleProgressBar />}>
        <UserListsContainer />
      </Suspense>
    </>
  );
}

export default UsersContainer;
