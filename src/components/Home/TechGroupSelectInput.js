import React, { useState, useEffect } from "react";
import { useRecoilValue, useRecoilState } from "recoil";
import { techGroupSelectValueState } from "../../state/atoms";
import { techGroupsQuery } from "../../state/selectors";
import SelectInput from "../UI/SelectInput";
import { HOME_DROPDOWN_DEFAULT_VALUE } from "../../config/Constants";

function TechGroupSelectInput() {
  const [selectValue, setSelectValue] = useRecoilState(
    techGroupSelectValueState
  );
  const techGroups = useRecoilValue(techGroupsQuery);
  const [allTechGroups, setAllTechGroups] = useState([
    HOME_DROPDOWN_DEFAULT_VALUE,
  ]);
  const handleChange = (event) => {
    setSelectValue(event.target.value);
  };

  useEffect(() => {
    const groups = [HOME_DROPDOWN_DEFAULT_VALUE, ...techGroups];
    setAllTechGroups(groups);
  }, [techGroups]);

  return (
    <SelectInput
      list={allTechGroups}
      value={selectValue}
      handleChange={handleChange}
    />
  );
}

export default TechGroupSelectInput;
