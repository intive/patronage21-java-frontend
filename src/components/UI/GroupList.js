import React from "react";
import PropTypes from "prop-types";
import List from "@material-ui/core/List";
import Grid from "@material-ui/core/Grid";
import ListSubheader from "@material-ui/core/ListSubheader";
import styled from "styled-components";

export const ListTitle = styled.span`
  flex: 1;
  font-weight: 600;
`;

const ListHeader = styled(ListSubheader)`
  background-color: ${({ theme }) => theme.customPalette.colors.bar};
  display: flex;
  font-size: 15px;
  color: ${({ theme }) => theme.palette.primary.main};
`;

const GroupList = (props) => {
  return (
    <Grid item md={6} sm={6} xs={12}>
      <List
        subheader={
          <ListHeader>
            <ListTitle>{props.title}</ListTitle>
            {props.counter}
          </ListHeader>
        }
      >
        {props.children}
      </List>
    </Grid>
  );
};

GroupList.propTypes = {
  title: PropTypes.string.isRequired,
  counter: PropTypes.number,
};

export default GroupList;
