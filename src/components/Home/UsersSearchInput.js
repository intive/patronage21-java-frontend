import React, { useState, useMemo } from "react";
import { useSetRecoilState } from "recoil";
import throttle from "lodash/debounce";
import { usersSearchValueState } from "../../state/atoms";
import SearchInput from "../UI/SearchInput";
import {
  HOME_SEARCH_INPUT_PLACEHOLDER,
  HOME_SEARCH_INPUT_ARIA_LABEL,
  HOME_SEARCH_THROTTLE_TIME,
} from "../../config/Constants";

function UsersSearchInput() {
  const setGlobalSearchValue = useSetRecoilState(usersSearchValueState);
  const [value, setValue] = useState("");

  const throttledSearch = useMemo(
    () =>
      throttle(
        (value) => setGlobalSearchValue(value),
        HOME_SEARCH_THROTTLE_TIME
      ),
    [setGlobalSearchValue]
  );

  const handleChange = (event) => {
    const value = event.target.value;
    setValue(value);
    if (value.length !== 1) {
      throttledSearch(value);
    }
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
