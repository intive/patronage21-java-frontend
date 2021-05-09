import React, { Suspense } from "react";
import Box from "@material-ui/core/Box";
import User from "../components/User/User";
import CircularProgress from "@material-ui/core/CircularProgress";

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

function UserEdit() {
  return (
    <>
      <Suspense fallback={circularProgress}>
        <User />
      </Suspense>
    </>
  );
}

export default UserEdit;
