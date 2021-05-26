import React from "react";
import styled from "styled-components";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import { USER_PANEL_MODULE_URL } from "../../../config/Constants";

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
  color: inherit;
  &:hover {
    text-decoration: none;
  }
`;

export default function Logo({ useLogoRedirect }) {
  const logoText = (
    <>
      <StyledSpan>Patron</StyledSpan>-a-<StyledSpan>tive</StyledSpan>
    </>
  );
  const activeLogo = (
    <StyledLink href={USER_PANEL_MODULE_URL}>{logoText}</StyledLink>
  );

  return (
    <StyledTypography>
      {useLogoRedirect ? activeLogo : logoText}
    </StyledTypography>
  );
}
