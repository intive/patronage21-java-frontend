import React from "react";
import styled from "styled-components";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";

const StyledSpan = styled("span")`
  font-weight: 600;
  &:hover {
    text-decoration: none;
  }
`;

const StyledTypography = styled(Typography).attrs({
  color: "secondary",
  variant: "h6",
  noWrap: true,
})`
  font-weight: 400;
  width: 100%;
`;

const StyledLink = styled(Link)`
  &:hover {
    text-decoration: none;
  }
`;

export default function Logo() {
  return (
    <StyledTypography>
      <StyledLink color="inherit" href="http://patronage21.herokuapp.com/">
        <StyledSpan>Patron</StyledSpan>-a-<StyledSpan>tive</StyledSpan>
      </StyledLink>
    </StyledTypography>
  );
}
