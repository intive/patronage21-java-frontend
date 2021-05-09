import React, { Suspense } from "react";
import User from "../components/User/User";
import CircleProgressBar from "../components/UI/CircleProgressBar";

function UserEdit() {
  return (
    <>
      <Suspense fallback={<CircleProgressBar />}>
        <User />
      </Suspense>
    </>
  );
}

export default UserEdit;
