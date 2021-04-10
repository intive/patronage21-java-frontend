import React from "react";
import TitleContainer from "../../components/Home/TitleContainer";
import UsersContainer from "../../components/Home/UsersContainer";
import { HOME_TITLE, HOME_INFO } from "../../config/Constants";

function Home() {
  const title = HOME_TITLE;
  const info = HOME_INFO;

  return (
    <>
      <TitleContainer title={title} info={info} />
      <UsersContainer />
    </>
  );
}

export default Home;
