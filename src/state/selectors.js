import { selector, selectorFamily } from "recoil";
import { usersSearchValueState } from "./atoms";
import { getTechGroups, getUsers } from "../client/client";

export const usersQuery = selectorFamily({
  key: "users",
  get: (role) => async ({ get }) => {
    return await getUsers(role, get(usersSearchValueState));
  },
});

export const techGroupsQuery = selector({
  key: "techGroups",
  get: async () => await getTechGroups(),
});
