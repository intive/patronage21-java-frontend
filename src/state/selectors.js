import { selector, selectorFamily } from "recoil";
import { getTechGroups, getUsers, updateUser, getUser } from "../client/client";
import {
  usersSearchValueState,
  currentUserState,
  userProperty,
  userIsEditedState,
} from "./atoms";

export const usersQuery = selectorFamily({
  key: "users",
  get:
    (role) =>
    ({ get }) =>
      getUsers(role, get(usersSearchValueState)),
});

export const techGroupsQuery = selector({
  key: "techGroups",
  get: () => getTechGroups(),
});

export const userQuery = selector({
  key: "user",
  get: ({ get }) => getUser(get(userProperty("login"))),
});

export const updateUserQuery = selector({
  key: "updateUser",
  set: ({ get, set }) => {
    const updatedUser = {};
    Object.keys(get(currentUserState)).forEach(
      (key) => (updatedUser[key] = get(userProperty(key)))
    );
    set(currentUserState, updatedUser);
    updateUser(updatedUser);
  },
});

export const cancelUserEditionQuery = selector({
  key: "cancelUserEdition",
  set: ({ get, set }) => {
    Object.keys(get(currentUserState)).forEach((key) =>
      set(userProperty(key), get(currentUserState)[key])
    );
    set(userIsEditedState, false);
  },
});
