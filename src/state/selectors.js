import { selector, selectorFamily } from "recoil";
import { getTechGroups, getUsers, getUser } from "../client/client";
import {
  currentUserState,
  userProperty,
  lastResponseState,
  alertFrameVisibleState,
  userIsEditedState,
} from "./atoms";

export const usersQuery = selectorFamily({
  key: "users",
  get: (role) => () => getUsers(role, false),
});

export const techGroupsQuery = selector({
  key: "techGroups",
  get: () => getTechGroups(),
});

export const userQuery = selector({
  key: "user",
  get: ({ get }) => getUser(get(userProperty("login"))),
});

export const setCurrentUserState = selector({
  key: "setCurrentUserState",
  set: ({ get, set }) => {
    const updatedUser = {};
    Object.keys(get(currentUserState)).forEach(
      (key) => (updatedUser[key] = get(userProperty(key)))
    );
    set(currentUserState, updatedUser);
  },
});

export const cancelUserEdition = selector({
  key: "cancelUserEdition",
  set: ({ get, set }) => {
    Object.keys(get(currentUserState)).forEach((key) =>
      set(userProperty(key), get(currentUserState)[key])
    );
    set(userIsEditedState, false);
    set(alertFrameVisibleState, false);
  },
});

export const setLastResponseState = selector({
  key: "setLastResponseState",
  set: ({ set }, response) => {
    let status, body;
    if (response.status) {
      status = response.status;
      body = response.body;
    } else if (response.error.message) {
      status = "error";
      body = response.error.message;
    }
    set(lastResponseState, { status, body });
  },
});

export const setUserProperties = selector({
  key: "setUserProperties",
  set: ({ get, set }) => {
    const currentUser = get(currentUserState);
    Object.keys(currentUser).forEach((key) =>
      set(userProperty(key), currentUser[key])
    );
  },
});
