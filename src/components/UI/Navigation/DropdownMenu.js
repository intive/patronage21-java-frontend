import { useState } from "react";
import MenuIcon from "@material-ui/icons/Menu";
import { IconButton, Menu, MenuItem } from "@material-ui/core";
import {
  BREADCRUMBS_HOME,
  MENU_ITEM_CALENDAR,
  MENU_ITEM_REGISTRATION,
  USER_PANEL_MODULE_URL,
  CALENDAR_MODULE_URL,
  REGISTRATION_MODULE_URL,
} from "../../../config/Constants";
import styled from "styled-components";

const NavItem = styled(MenuItem)`
  font-size: 14px;
  padding: 5px 20px;
  min-height: 20px;
`;
export default function DropdownMenu() {
  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = (e) => setAnchorEl(e.currentTarget);
  const closeMenu = () => setAnchorEl(null);

  return (
    <>
      <IconButton
        id="basic-button"
        aria-controls="menu"
        aria-haspopup="true"
        aria-expanded={anchorEl ? "true" : undefined}
        onClick={openMenu}
      >
        <MenuIcon />
      </IconButton>

      <Menu
        id="menu"
        anchorEl={anchorEl}
        open={!!anchorEl}
        onClose={closeMenu}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <NavItem href={USER_PANEL_MODULE_URL} component="a">
          {BREADCRUMBS_HOME}
        </NavItem>
        <NavItem href={CALENDAR_MODULE_URL} component="a">
          {MENU_ITEM_CALENDAR}
        </NavItem>
        <NavItem href={REGISTRATION_MODULE_URL} component="a">
          {MENU_ITEM_REGISTRATION}
        </NavItem>
      </Menu>
    </>
  );
}
