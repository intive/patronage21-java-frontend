import React from "react";
import { useRecoilState } from "recoil";
import { usersSearchValueState } from "../../state/atoms";
import SearchInput from "../UI/SearchInput";
import {
  HOME_SEARCH_PLACEHOLDER,
  HOME_SEARCH_ARIA_LABEL,
} from "../../config/Constants";

function UsersSearchInput() {
  const [searchValue, setSearchValue] = useRecoilState(usersSearchValueState);
  const handleChange = (e) => setSearchValue(e.target.value);

  return (
    <SearchInput
      placeholder={HOME_SEARCH_PLACEHOLDER}
      ariaLabel={HOME_SEARCH_ARIA_LABEL}
      value={searchValue}
      handleChange={handleChange}
    />
  );
}

export default UsersSearchInput;
