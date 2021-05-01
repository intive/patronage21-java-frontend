import React from "react";
import TitleContainer from "../../components/Home/TitleContainer";
import UsersContainer from "../../components/Home/UsersContainer";
import { HOME_TITLE, HOME_INFO } from "../../config/Constants";

function Home() {
  return (
    <>
      <TitleContainer title={HOME_TITLE} info={HOME_INFO} />
      <UsersContainer />
    </>
  );
}

export default Home;
