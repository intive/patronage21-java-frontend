import React from "react";
import Box from "@material-ui/core/Box";
import styled from "styled-components";

export const Header = styled.h1`
  color: ${({ theme }) => theme.palette.primary.main};
  font-weight: 600;
`;

const SiteHeader = (props) => {
  return (
    <Box my={4}>
      <Header>{props.children}</Header>
    </Box>
  );
};

export default SiteHeader;
