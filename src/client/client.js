import { techGroups } from "../mocks/techGroups";

const Frisbee = require("frisbee");

const api = new Frisbee({
  baseURI: "http://localhost:8080/frontend-api",
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
