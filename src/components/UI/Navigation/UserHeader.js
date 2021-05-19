import React from "react";
import IconButton from "@material-ui/core/IconButton";
import PersonIcon from "@material-ui/icons/Person";
import SearchIcon from "@material-ui/icons/Search";
import { fade } from "@material-ui/core/styles";
import styled from "styled-components";
import SearchBar from "./Search";
import AppHeader from "./AppHeader";
import Breadcrumbs from "./Breadcrumbs";
import DropdownMenu from "./DropdownMenu";
import AlertFrame from "../../../components/UI/AlertFrame";
import { useRecoilValue } from "recoil";
import { alertFrameVisibleState } from "../../../state/atoms";

const Buttons = styled.div`
  ${({ theme }) => `
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  button {
    margin-left: ${theme.spacing(2)}px;
    color: ${fade(theme.palette.text.primary, 0.5)}
  }
  `}
`;

export default function UserHeader() {
  const alertVisible = useRecoilValue(alertFrameVisibleState);
  return (
    <>
      <AppHeader>
        <SearchBar>
          <SearchIcon />
        </SearchBar>
        <Buttons>
          <IconButton>
            <PersonIcon />
          </IconButton>
          <DropdownMenu />
        </Buttons>
      </AppHeader>
      {alertVisible && <AlertFrame />}
      <Breadcrumbs />
    </>
  );
}
