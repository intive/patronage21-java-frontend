import { techGroups } from "../mocks/techGroups";
import { config } from "../config/Config";

const Frisbee = require("frisbee");

const api = new Frisbee({
  baseURI: config.API_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  mode: "cors",
});

export const getTechGroups = async () =>
  new Promise((resolve) => setTimeout(() => resolve(techGroups), 500));

export const getUsers = async (role, searchedUserData) => {
  try {
    const params = ["firstName", "lastName", "username"]
      .filter(() => searchedUserData)
      .reduce((accumulator, param) => {
        accumulator[param] = searchedUserData;
        return accumulator;
      }, {});

    const res = await api.get("/users", {
      body: { ...params, role: role },
    });
    if (res.err) {
      console.error(res.err);
      return [];
    }
    return res.body.users;
  } catch (error) {
    console.error(error);
    return [];
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
    const res = await api.put("/users", {
      body: params,
    });
    if (res.err) {
      console.error(res.err);
    }
  } catch (error) {
    console.error(error);
  }
};
