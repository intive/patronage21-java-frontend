import { HOME_DROPDOWN_DEFAULT_VALUE } from "../config/Constants";
const Frisbee = require("frisbee");

const api = new Frisbee({
  baseURI: process.env.REACT_APP_USER_MODULE_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  mode: "cors",
});

export const getTechGroups = async () => {
  try {
    const response = await api.get("/groups", {});
    if (response.err) {
      console.error(response.err);
      return [];
    }
    return response.body.groups;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getUsers = async (role, searchedUserData, group) => {
  try {
    let params;
    if (searchedUserData && searchedUserData.length > 0) {
      params = { other: searchedUserData };
    }
    if (group && group !== HOME_DROPDOWN_DEFAULT_VALUE) {
      params = { technologyGroup: group, ...params };
    }
    const response = await api.get("/users", {
      body: { role: role, ...params },
    });
    if (response.body.users) {
      return response;
    } else {
      response.body.users = [];
      return response;
    }
  } catch (error) {
    const response = { error, body: { users: [] } };
    return response;
  }
};

export const updateUser = async (updatedUser) => {
  try {
    const params = [
      "login",
      "firstName",
      "lastName",
      "email",
      "phoneNumber",
      "gitHubUrl",
      "bio",
      "projects",
    ].reduce((accumulator, param) => {
      accumulator[param] = updatedUser[param];
      return accumulator;
    }, {});
    const response = await api.put("/users", {
      body: params,
    });
    if (response.err) {
      console.error(response.err);
    }
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const getUser = async (login) => {
  try {
    const response = await api.get(`/users/${login}`);
    if (response.err) {
      console.error(response.err);
      return {};
    }
    return response.body.user;
  } catch (error) {
    console.error(error);
    return {};
  }
};

export const deactivateUserByLogin = async (login) => {
  try {
    const response = await api.patch(`/users/${login}/deactivate`);
    if (response.err) {
      console.error(response.err);
    }
    return response.body.user;
  } catch (error) {
    console.error(error);
    return {};
  }
};
