import { atom, atomFamily, selectorFamily } from "recoil";
import { userEdit } from "../mocks/userEdit";

export const usersSearchValueState = atom({
  key: "usersSearchValue",
  default: "",
});

export const techGroupSelectValueState = atom({
  key: "groupSelectValue",
  default: "all",
});

export const currentUserState = atom({
  key: "currentUser",
  default: userEdit,
});

export const userProperty = atomFamily({
  key: "userProperty",
  default: selectorFamily({
    key: "userPropertyDefault",
    get: (property) => ({ get }) => {
      return get(currentUserState)[property];
    },
  }),
});

export const userIsEditedState = atom({
  key: "userIsEdited",
  default: false,
});
