import React from "react";
import { useRecoilValue, useRecoilState } from "recoil";
import { techGroupSelectValueState } from "../../state/atoms";
import { techGroupsQuery } from "../../state/selectors";
import SelectInput from "../UI/SelectInput";

function TechGroupSelectInput() {
  const [selectValue, setSelectValue] = useRecoilState(
    techGroupSelectValueState
  );
  const techGroups = useRecoilValue(techGroupsQuery);
  const handleChange = (e) => setSelectValue(e.target.value);

  return (
    <SelectInput
      list={techGroups}
      value={selectValue}
      handleChange={handleChange}
    />
  );
}

export default TechGroupSelectInput;
