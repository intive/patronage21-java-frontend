import { selector, selectorFamily } from "recoil";
import {
  alertFrameVisibleState,
  alertState,
  projectNameAndRoleToValidateState,
} from "../state/atoms";
import {
  hasProjectDuplicateEdit,
  hasProjectNotSelectedRoleEdit,
  isProjectWithRoleAlreadyExists,
} from "../state/selectors";
import {
  ERROR,
  PROJECT_WITHOUT_ROLE_MSG,
  PROJECT_WITH_DUPLICATED_ROLE_MSG,
  PROJECT_ROLE_NOT_SELECTED_OR_NOT_AVAILABLE_MSG,
  PROJECT_NOT_SELECTED_OR_NOT_AVAILABLE_MSG,
  PROJECT_ROLE_EDIT_ACTION_NAME,
} from "../config/AlertConstants";
import {
  USER_PROJECT_DROPDOWN_NOT_SELECTED_VALUE,
  USER_PROJECT_DROPDOWN_UNAVAILABLE_VALUE,
  USER_PROJECT_ROLE_DROPDOWN_NOT_SELECTED_VALUE,
  USER_PROJECT_ROLE_DROPDOWN_UNAVAILABLE_VALUE,
} from "../config/Constants";

export const getNewProjectInputError = selectorFamily({
  key: "getNewProjectInputError",
  get:
    (project) =>
    ({ get }) => {
      const projectWithRoleAlreadyExists = get(
        isProjectWithRoleAlreadyExists({
          name: project.name,
          role: project.role,
        })
      );

      if (isProjectInputValid(project.name)) {
        return createError(
          "userProjectName",
          PROJECT_NOT_SELECTED_OR_NOT_AVAILABLE_MSG
        );
      } else if (isProjectRoleInputValid(project.role)) {
        return createError(
          "userProjectRoleName",
          PROJECT_ROLE_NOT_SELECTED_OR_NOT_AVAILABLE_MSG
        );
      } else if (projectWithRoleAlreadyExists) {
        return createError(
          "userProjectRoleName",
          PROJECT_WITH_DUPLICATED_ROLE_MSG
        );
      }

      return null;
    },
});

export const getEditProjectsInputError = selector({
  key: "getEditProjectsInputError",
  get: ({ get }) => {
    if (get(hasProjectNotSelectedRoleEdit)) {
      return createError("userProjectRoleName", PROJECT_WITHOUT_ROLE_MSG);
    } else if (get(hasProjectDuplicateEdit)) {
      return createError(
        "userProjectRoleName",
        PROJECT_WITH_DUPLICATED_ROLE_MSG
      );
    }

    return null;
  },
});

export const hasNewProjectInputError = selectorFamily({
  key: "hasNewProjectInputError",
  get:
    (project) =>
    ({ get }) => {
      const error = get(
        getNewProjectInputError({
          name: project.name,
          role: project.role,
        })
      );

      return error !== null;
    },
});

export const hasEditedProjectsInputError = selector({
  key: "hasEditedProjectsInputError",
  get: ({ get }) => {
    const error = get(getEditProjectsInputError);
    return error !== null;
  },
});

export const checkProjectWithRoleAddAlerts = selector({
  key: "checkProjectWithRoleAddAlerts",
  set: ({ get, set }, caller) => {
    const readedValues = get(projectNameAndRoleToValidateState).values;
    const errors = get(
      getNewProjectInputError({
        name: readedValues.projectName,
        role: readedValues.projectRole,
      })
    );
    if (errors === null) {
      set(alertFrameVisibleState, false);
      return;
    }

    const alert = {};
    setAlert(alert, ERROR, readedValues.title, errors);
    alert.caller = caller;
    set(alertState, alert);
  },
});

export const showAlert = selector({
  key: "showAlert",
  set: ({ set }) => {
    set(alertFrameVisibleState, true);
  },
});

const createError = (fieldNameValue, messageValue) => {
  return {
    violationErrors: [
      {
        fieldName: fieldNameValue,
        message: messageValue,
      },
    ],
  };
};

const isProjectInputValid = (projectName) => {
  const disallowedInputProjectValues = [
    "",
    USER_PROJECT_DROPDOWN_NOT_SELECTED_VALUE,
    USER_PROJECT_DROPDOWN_UNAVAILABLE_VALUE,
  ];
  return disallowedInputProjectValues.includes(projectName);
};

const isProjectRoleInputValid = (projectRole) => {
  const disallowedInputRoleValues = [
    "",
    USER_PROJECT_ROLE_DROPDOWN_NOT_SELECTED_VALUE,
    USER_PROJECT_ROLE_DROPDOWN_UNAVAILABLE_VALUE,
  ];
  return disallowedInputRoleValues.includes(projectRole);
};

export const checkProjectWithRoleEditAlerts = selector({
  key: "checkProjectWithRoleEditAlerts",
  set: ({ set, get }, caller) => {
    const errors = get(getEditProjectsInputError);
    if (errors === null) {
      set(alertFrameVisibleState, false);
      return;
    }

    const alert = {};
    setAlert(alert, ERROR, PROJECT_ROLE_EDIT_ACTION_NAME, errors);
    set(alertFrameVisibleState, true);
    alert.caller = caller;
    set(alertState, alert);
  },
});

const setAlert = (alert, severity, title, content, caller) => {
  alert.severity = severity;
  alert.title = title;
  alert.content = content;
  alert.caller = caller;
};
