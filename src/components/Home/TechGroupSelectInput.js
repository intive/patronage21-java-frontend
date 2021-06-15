import React, { useState, useEffect } from "react";
import { useRecoilValue, useRecoilState, useSetRecoilState } from "recoil";
import { techGroupSelectValueState } from "../../state/atoms";
import { techGroupsQuery, setLastResponseState } from "../../state/selectors";
import { checkGroupsFetchAlerts } from "../../alerts/alertSelectors";
import SelectInput from "../UI/SelectInput";
import { HOME_DROPDOWN_DEFAULT_VALUE } from "../../config/Constants";

function TechGroupSelectInput() {
  const setResponse = useSetRecoilState(setLastResponseState);
  const setGroupsFetchAlerts = useSetRecoilState(checkGroupsFetchAlerts);
  const [selectValue, setSelectValue] = useRecoilState(
    techGroupSelectValueState
  );
  const techGroupsResponse = useRecoilValue(techGroupsQuery);
  const [allTechGroups, setAllTechGroups] = useState([
    HOME_DROPDOWN_DEFAULT_VALUE,
  ]);

  useEffect(() => {
    setResponse(techGroupsResponse);
    setGroupsFetchAlerts("groups");
  }, [techGroupsResponse, setGroupsFetchAlerts, setResponse]);

  const handleChange = (event) => {
    setSelectValue(event.target.value);
  };

  useEffect(() => {
    const techGroups = techGroupsResponse.body.groups;
    const groups = [HOME_DROPDOWN_DEFAULT_VALUE, ...techGroups];
    setAllTechGroups(groups);
  }, [techGroupsResponse]);

  return (
    <SelectInput
      list={allTechGroups}
      value={selectValue}
      handleChange={handleChange}
    />
  );
}

export default TechGroupSelectInput;
