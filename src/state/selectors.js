import { selector, selectorFamily } from "recoil";
import {
  getTechGroups,
  getUsers,
  getUser,
  getProjects,
  getProjectRolesByProjectId,
} from "../client/client";
import {
  currentUserState,
  userProperty,
  lastResponseState,
  alertFrameVisibleState,
  userIsEditedState,
  projectEditionState,
  projectNameAndRoleToValidateState,
} from "./atoms";
import {
  USER_PROJECT_ROLE_DROPDOWN_NOT_SELECTED_VALUE,
  USER_PROJECT_ROLE_DROPDOWN_UNAVAILABLE_VALUE,
} from "../config/Constants";

export const usersQuery = selectorFamily({
  key: "users",
  get: (role) => () => getUsers(role, false),
});

export const techGroupsQuery = selector({
  key: "techGroups",
  get: () => getTechGroups(),
});

export const projectsQuery = selectorFamily({
  key: "projects",
  get:
    (year) =>
    ({ get }) =>
      getProjects(year),
});

export const projectRolesByProjectIdQuery = selectorFamily({
  key: "projectRoles",
  get:
    (id) =>
    ({ get }) =>
      typeof id !== "undefined" ? getProjectRolesByProjectId(id) : [],
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

export const getEditionTempUser = selector({
  key: "getEditionTempUser",
  get: ({ get }) => {
    const editedUser = {};
    Object.keys(get(currentUserState)).forEach(
      (key) => (editedUser[key] = get(userProperty(key)))
    );
    return editedUser;
  },
});

export const isUserDataChanged = selector({
  key: "isUserDataChanged",
  get: ({ get }) => {
    let userDataUpdated = false;
    if (get(currentUserState)) {
      userDataUpdated = Object.keys(get(currentUserState)).some((key) => {
        if (key === "image") return false;
        return get(currentUserState)[key] !== get(userProperty(key));
      });
    }
    return userDataUpdated;
  },
});

export const isProjectWithRoleAlreadyExists = selectorFamily({
  key: "isProjectWithRoleAlreadyExists",
  get:
    (project) =>
    ({ get }) => {
      let projects = get(userProperty("projects"));
      let result = projects.find(
        (element) =>
          element.name === project.name && element.role === project.role
      );
      return result !== undefined ? result : false
    },
});

export const hasProjectDuplicateEdit = selector({
  key: "hasProjectDuplicateEdit",
  get: ({ get }) => {
    const hasDuplicate = (arr) =>
      new Set(arr.map(({ name, role }) => `id|${name}|value|${role}`)).size <
      arr.length;
    const projects = get(userProperty("projects"));
    let result = false;
    if (get(currentUserState)) {
      result = hasDuplicate(projects);
    }
    return result;
  },
});

export const hasProjectNotSelectedRoleEdit = selector({
  key: "hasProjectNotSelectedRoleEdit",
  get: ({ get }) => {
    const projects = get(userProperty("projects"));
    let resultArr = projects.filter((obj) => {
      return (
        obj.role === undefined ||
        obj.role === USER_PROJECT_ROLE_DROPDOWN_NOT_SELECTED_VALUE ||
        obj.role === USER_PROJECT_ROLE_DROPDOWN_UNAVAILABLE_VALUE
      );
    });
    return resultArr.length > 0;
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
    } else if (response.error && response.error.message) {
      status = "error";
      body = response.error.message;
    }
    set(lastResponseState, { status, body });
  },
});

export const setErrorProjectEditionState = selector({
  key: "setErrorProjectEditionState",
  set: ({ set }, error) => {
    set(projectEditionState, { error });
  },
});

export const setProjectAndRoleToValidateState = selector({
  key: "setProjectAndRoleToValidateState",
  set: ({ set }, values) => {
    set(projectNameAndRoleToValidateState, { values });
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
