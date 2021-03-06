import { selector} from "recoil";
import {
  alertFrameVisibleState,
  lastResponseState,
  alertState,
  userIsEditedState,
} from "../state/atoms";
import {
  setCurrentUserState,
} from "../state/selectors";
import {
  ERROR,
  SUCCESS,
  INFO,
  GENERAL_ERROR_MSG,
  APP_ERROR_MSG,
  USER_NOT_FOUND_MSG,
  NO_CONNECTION_MSG,
  INCORRECT_DATA_MSG,
  DATA_NOT_CHANGED_MSG,
  DATA_UPDATED_MSG,
  SERVER_ERROR_MSG,
  IMAGE_UPDATED_MSG,
  USER_DEACTIVATED_MSG,
} from "../config/AlertConstants";

export const checkSearchAlerts = selector({
  key: "checkSearchAlerts",
  set: ({ get, set }, caller) => {
    const status = get(lastResponseState).status;
    const content = get(lastResponseState).body;
    const lastAlertCaller = get(alertState).caller;
    const alert = {};

    switch (status) {
      case 200:
      case 422:
        if (lastAlertCaller === caller) {
          set(alertFrameVisibleState, false);
        }
        break;
      case 404:
        setAlert(alert, ERROR, NO_CONNECTION_MSG, "");
        alert.caller = caller;
        set(alertFrameVisibleState, true);
        set(alertState, alert);
        break;
      default:
        checkCommonErrors(status, content, alert, caller);
        alert.caller = caller;
        set(alertFrameVisibleState, true);
        set(alertState, alert);
    }
  },
});

export const checkEditionAlerts = selector({
  key: "checkEditionAlerts",
  set: ({ get, set }, caller) => {
    const status = get(lastResponseState).status;
    const content = get(lastResponseState).body;
    const alert = {};
    switch (status) {
      case 200:
        set(setCurrentUserState);
        set(userIsEditedState, false);
        setAlert(alert, SUCCESS, DATA_UPDATED_MSG, "");
        set(alertFrameVisibleState, true);
        break;
      case 404:
        if (content.violationErrors) {
          setAlert(alert, ERROR, USER_NOT_FOUND_MSG, content);
        } else {
          setAlert(alert, ERROR, NO_CONNECTION_MSG, "");
        }
        set(alertFrameVisibleState, true);
        break;
      case 422:
        setAlert(alert, ERROR, INCORRECT_DATA_MSG, content);
        set(alertFrameVisibleState, true);
        break;
      case "sameData":
        setAlert(alert, INFO, DATA_NOT_CHANGED_MSG, "");
        set(alertFrameVisibleState, true);
        break;
      default:
        checkCommonErrors(status, content, alert, caller);
        set(alertFrameVisibleState, true);
    }
    alert.caller = caller;
    set(alertState, alert);
  },
});

export const checkImageEditionAlerts = selector({
  key: "checkImageEditionAlerts",
  set: ({ get, set }, caller) => {
    const status = get(lastResponseState).status;
    const content = get(lastResponseState).body;
    const alert = {};
    switch (status) {
      case 200:
        setAlert(alert, SUCCESS, IMAGE_UPDATED_MSG, "");
        set(alertFrameVisibleState, true);
        break;
      case 404:
        if (content.violationErrors) {
          setAlert(alert, ERROR, USER_NOT_FOUND_MSG, content);
        } else {
          setAlert(alert, ERROR, NO_CONNECTION_MSG, "");
        }
        set(alertFrameVisibleState, true);
        break;
      case 422:
        setAlert(alert, ERROR, INCORRECT_DATA_MSG, content);
        set(alertFrameVisibleState, true);
        break;
      default:
        checkCommonErrors(status, content, alert, caller);
        set(alertFrameVisibleState, true);
    }
    alert.caller = caller;
    set(alertState, alert);
  },
});

export const checkGroupsFetchAlerts = selector({
  key: "checkGroupsFetchAlerts",
  set: ({ get, set }, caller) => {
    const status = get(lastResponseState).status;
    const content = get(lastResponseState).body;
    const lastAlertCaller = get(alertState).caller;
    const alert = {};

    switch (status) {
      case 200:
        if (lastAlertCaller === caller) {
          set(alertFrameVisibleState, false);
        }
        break;
      case 404:
        setAlert(alert, ERROR, NO_CONNECTION_MSG, "");
        alert.caller = caller;
        set(alertFrameVisibleState, true);
        set(alertState, alert);
        break;
      default:
        checkCommonErrors(status, content, alert, caller);
        set(alertFrameVisibleState, true);
    }
    set(alertState, alert);
  },
});

export const checkDeactivationAlerts = selector({
  key: "checkDeactivationAlerts",
  set: ({ get, set }, caller) => {
    const status = get(lastResponseState).status;
    const content = get(lastResponseState).body;
    const alert = {};
    switch (status) {
      case 200:
        setAlert(alert, SUCCESS, USER_DEACTIVATED_MSG, "");
        set(alertFrameVisibleState, true);
        break;
      case 404:
        if (content.violationErrors) {
          setAlert(alert, ERROR, USER_NOT_FOUND_MSG, content);
        } else {
          setAlert(alert, ERROR, NO_CONNECTION_MSG, "");
        }
        set(alertFrameVisibleState, true);
        break;
      case 422:
        setAlert(alert, ERROR, INCORRECT_DATA_MSG, content);
        set(alertFrameVisibleState, true);
        break;
      default:
        checkCommonErrors(status, content, alert, caller);
        set(alertFrameVisibleState, true);
    }
    alert.caller = caller;
    set(alertState, alert);
  },
});

export const checkUserFetchAlerts = selector({
  key: "checkUserFetchAlerts",
  set: ({ get, set }, caller) => {
    const status = get(lastResponseState).status;
    const content = get(lastResponseState).body;
    const lastAlertCaller = get(alertState).caller;
    const alert = {};

    switch (status) {
      case 200:
        if (lastAlertCaller === caller) {
          set(alertFrameVisibleState, false);
        }
        break;
      case 404:
        if (content.violationErrors) {
          setAlert(alert, ERROR, USER_NOT_FOUND_MSG, content);
        } else {
          setAlert(alert, ERROR, NO_CONNECTION_MSG, "");
        }
        alert.caller = caller;
        set(alertFrameVisibleState, true);
        break;
      default:
        checkCommonErrors(status, content, alert, caller);
        set(alertFrameVisibleState, true);
    }
  },
});

const checkCommonErrors = (status, content, alert, caller) => {
  switch (status) {
    case "error":
      alert.caller = caller;
      setAlert(alert, ERROR, APP_ERROR_MSG, content);
      break;
    default:
      const firstChar = (status + "")[0];
      if (firstChar === "5") {
        setAlert(alert, ERROR, SERVER_ERROR_MSG, "");
      } else {
        setAlert(alert, ERROR, GENERAL_ERROR_MSG, "");
      }
      alert.caller = caller;
  }
};

const setAlert = (alert, severity, title, content, caller) => {
  alert.severity = severity;
  alert.title = title;
  alert.content = content;
  alert.caller = caller;
};
