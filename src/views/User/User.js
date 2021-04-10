import React from "react";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import { user } from "../../mocks/user";
import { makeStyles } from "@material-ui/core/styles";
import ListGroup from "../../components/User/ListGroup";
import GroupTitle from "../../components/UI/GroupTitle";
import UserHeader from "../../components/User/UserHeader";
import ContactItem from "../../components/User/ContactItem";
import ProjectsList from "../../components/User/ProjectsList";
import {
  USER_BIO_TITLE,
  USER_CONTACT_BUTTON_GITHUB,
  USER_CONTACT_BUTTON_MAIL,
  USER_CONTACT_BUTTON_PHONE,
  USER_CONTACT_TITLE,
} from "../../config/Constants";
import Information from "../../components/UI/Information";

const styles = makeStyles((theme) => ({
  text: {
    paddingLeft: 15,
    paddingRight: 15,
    columnCount: 2,
    wordBreak: "keep-all",
  },
}));

function User() {
  const classes = styles();

  return (
    <>
      <UserHeader firstName={user.firstName} lastName={user.lastName} />
      <GroupTitle>{USER_BIO_TITLE}</GroupTitle>
      <Information info={user.bio} class={classes.text} />
      <Box my={5}>
        <Grid container spacing={3}>
          <ProjectsList projects={user.projects} />
          <ListGroup groupTitle={USER_CONTACT_TITLE}>
            <ContactItem
              contact={user.email}
              text={USER_CONTACT_BUTTON_MAIL}
              divider={true}
            />
            <ContactItem
              contact={user.phone}
              text={USER_CONTACT_BUTTON_PHONE}
              divider={true}
            />
            <ContactItem
              contact={user.github}
              text={USER_CONTACT_BUTTON_GITHUB}
              divider={false}
            />
          </ListGroup>
        </Grid>
      </Box>
    </>
  );
}

export default User;
