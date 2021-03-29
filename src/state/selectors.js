import { selector } from "recoil";
import { getTechGroups, getUsers } from "../client/client";

export const usersQuery = selector({
  key: "users",
  get: async () => {
    const response = await getUsers();
    return response;
  },
});

export const techGroupsQuery = selector({
  key: "techGroups",
  get: async () => {
    const response = await getTechGroups();
    return response;
  },
});
