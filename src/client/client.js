import { techGroups } from "../mocks/techGroups";
import { HTTP_STATUS_OK } from "../config/Constants";

const Frisbee = require("frisbee");

const api = new Frisbee({
  baseURI: "http://localhost:3000",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export const getTechGroups = async () =>
  new Promise((resolve) => setTimeout(() => resolve(techGroups), 500));

export const getUsers = async () => {
  try {
    const res = await api.get("/api/users");
    if (res.err) throw res.err;
    return getUsersFromResponse(res);
  } catch (error) {
    console.error(error);
    return [];
  }
};

const getUsersFromResponse = (res) => {
  if (res.status === HTTP_STATUS_OK) {
    return res.body;
  } else {
    return [];
  }
};
