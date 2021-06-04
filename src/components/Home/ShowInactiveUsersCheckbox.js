import React, { useState, useMemo } from "react";
import { useSetRecoilState } from "recoil";
import throttle from "lodash/debounce";
import { showInactiveUsersState } from "../../state/atoms";
import Checkbox from "../UI/Checkbox";
import {
  HOME_SHOW_INACTIVE_CHECKBOX_LABEL,
  HOME_SEARCH_THROTTLE_TIME,
} from "../../config/Constants";

function ShowInactiveUsersCheckbox() {
  const [checked, setChecked] = useState(false);
  const setShowAllUsers = useSetRecoilState(showInactiveUsersState);

  const throttledCheck = useMemo(
    () =>
      throttle(
        (checked) => setShowAllUsers(checked),
        HOME_SEARCH_THROTTLE_TIME
      ),
    [setShowAllUsers]
  );

  const handleChange = (event) => {
    const checked = event.target.checked;
    setChecked(checked);
    throttledCheck(checked);
  };

  return (
    <Checkbox
      checked={checked}
      label={HOME_SHOW_INACTIVE_CHECKBOX_LABEL}
      handleChange={handleChange}
    />
  );
}

export default ShowInactiveUsersCheckbox;
