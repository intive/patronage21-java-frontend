import React, { useState } from "react";
import { useSetRecoilState } from "recoil";
import { usersSearchValueState } from "../../state/atoms";
import SearchInput from "../UI/SearchInput";
import {
  HOME_SEARCH_INPUT_PLACEHOLDER,
  HOME_SEARCH_INPUT_ARIA_LABEL,
} from "../../config/Constants";

function UsersSearchInput() {
  const setGlobalSearchValue = useSetRecoilState(usersSearchValueState);
  const [value, setValue] = useState("");
  const handleChange = (e) => {
    const value = e.target.value;
    setValue(value);
    if (value.length !== 1) setGlobalSearchValue(value);
  };

  return (
    <SearchInput
      placeholder={HOME_SEARCH_INPUT_PLACEHOLDER}
      ariaLabel={HOME_SEARCH_INPUT_ARIA_LABEL}
      value={value}
      handleChange={handleChange}
    />
  );
}

export default UsersSearchInput;
