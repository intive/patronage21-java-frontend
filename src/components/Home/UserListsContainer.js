import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import UserList from "./UserList";
import {
  ROLE_CANDIDATE,
  ROLE_LEADER,
  HOME_LIST_LEADERS_TITLE,
  HOME_LIST_CANDIDATES_TITLE,
} from "../../config/Constants";

function UserListsContainer() {
  return (
    <Box my={5}>
      <Grid container spacing={3}>
          <UserList title={HOME_LIST_LEADERS_TITLE} role={ROLE_LEADER} />
          <UserList title={HOME_LIST_CANDIDATES_TITLE} role={ROLE_CANDIDATE} />
      </Grid>
    </Box>
  );
}

export default UserListsContainer;
