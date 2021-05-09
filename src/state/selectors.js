import { selector, selectorFamily } from "recoil";
import { usersSearchValueState, currentUserState, userProperty } from "./atoms";
import { getTechGroups, getUsers, updateUser, getUser } from "../client/client";

export const usersQuery = selectorFamily({
  key: "users",
  get:
    (role) =>
    ({ get }) => {
      return getUsers(role, get(usersSearchValueState));
    },
});

export const techGroupsQuery = selector({
  key: "techGroups",
  get: () => getTechGroups(),
});

export const userQuery = selectorFamily({
  key: "user",
  get:
    (login) =>
    ({ get }) => {
      return getUser(login);
    },
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
  },
});
