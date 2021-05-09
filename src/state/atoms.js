import { atom, atomFamily, selectorFamily } from "recoil";
import { HOME_DROPDOWN_DEFAULT_VALUE } from "../config/Constants";

export const activeViewState = atom({
  key: "activeView",
  default: "home",
});

export const usersSearchValueState = atom({
  key: "usersSearchValue",
  default: "",
});

export const techGroupSelectValueState = atom({
  key: "groupSelectValue",
  default: HOME_DROPDOWN_DEFAULT_VALUE,
});

export const currentUserState = atom({
  key: "currentUser",
  default: {},
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
