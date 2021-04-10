import { atom } from "recoil";

export const usersSearchValueState = atom({
  key: "usersSearchValue",
  default: "",
});

export const techGroupSelectValueState = atom({
  key: "groupSelectValue",
  default: "all",
});
