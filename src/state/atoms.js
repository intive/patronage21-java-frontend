import { atom, atomFamily, selectorFamily } from "recoil";
import {
  HOME_DROPDOWN_DEFAULT_VALUE,
  USER_PROJECT_DROPDOWN_NOT_SELECTED_VALUE,
} from "../config/Constants";

export const activeViewState = atom({
  key: "activeView",
  default: "home",
});

export const alertFrameVisibleState = atom({
  key: "alertFrameVisible",
  default: false,
});

export const lastResponseState = atom({
  key: "lastRespose",
  default: {},
});

export const projectEditionState = atom({
  key: "projectEditionState",
  default: {},
});

export const projectNameAndRoleToValidateState = atom({
  key: "projectNameAndRoleToValidateState",
  default: {},
});

export const alertState = atom({
  key: "alert",
  default: {},
});

export const usersSearchValueState = atom({
  key: "usersSearchValue",
  default: "",
});

export const techGroupSelectValueState = atom({
  key: "groupSelectValue",
  default: HOME_DROPDOWN_DEFAULT_VALUE,
});

export const showInactiveUsersState = atom({
  key: "showInactiveUsers",
  default: false,
});

export const selectedProjectState = atom({
  key: "selectedProjectValue",
  default: USER_PROJECT_DROPDOWN_NOT_SELECTED_VALUE,
});

export const currentUserState = atom({
  key: "currentUser",
  default: {},
});

export const userLoadedState = atom({
  key: "userLoadedUser",
  default: false,
});

export const userProperty = atomFamily({
  key: "userProperty",
  default: selectorFamily({
    key: "userPropertyDefault",
    get:
      (property) =>
      ({ get }) => {
        return get(currentUserState)[property];
      },
  }),
});

export const userIsEditedState = atom({
  key: "userIsEdited",
  default: false,
});

export const viewChangedState = atom({
  key: "viewChanged",
  default: false,
});