import React from "react";
import InputBase from "@material-ui/core/InputBase";
import { fade } from "@material-ui/core/styles";
import styled from "styled-components";
import { APPBAR_SEARCH_INPUT_PLACEHOLDER } from "../../../config/Constants";

const StyledSearch = styled("div").attrs({
  "aria-label": ({ aria }) => aria,
})`
  ${({ theme }) => `
    position: relative; 
    display: flex;
    align-items: center;
    justify-content: space-between;
    border: 1px solid ${fade(theme.palette.text.primary, 0.2)};
    background-color: transparent;
    margin-right: ${theme.spacing(3)}px;
    width: 100%;
    margin-left: ${theme.spacing(3)}px;
  `}
`;
const StyledInputBase = styled(InputBase)`
  ${({ theme }) => `
    color: inherit;
    width: 100%;
    font-size: 1rem;
    padding: ${theme.spacing(0.5)}px ${theme.spacing(2)}px;
    width: calc(100% - ${theme.spacing(3)}px)
  `}
`;

const StyledSearchIcon = styled("div")`
  ${({ theme }) => `
    padding: 0 16px;
    height: 100%;
    pointerEvents: none;
    display: flex;
    alignItems: center;
    justifyContent: center;
    color: ${fade(theme.palette.text.primary, 0.5)}
  `}
`;

export default function SearchBar({
  aria,
  onChange,
  placeholder = APPBAR_SEARCH_INPUT_PLACEHOLDER,
  children,
}) {
  return (
    <StyledSearch>
      <StyledInputBase
        placeholder={placeholder}
        onChange={onChange}
        aria-label={aria}
      />
      <StyledSearchIcon>{children}</StyledSearchIcon>
    </StyledSearch>
  );
}
