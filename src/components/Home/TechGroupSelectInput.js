import React, { useState, useEffect } from "react";
import { useRecoilValue, useRecoilState, useSetRecoilState } from "recoil";
import { techGroupSelectValueState } from "../../state/atoms";
import { techGroupsQuery, setLastResponseState } from "../../state/selectors";
import { checkGroupsFetchAlerts } from "../../alerts/alertSelectors";
import SelectInput from "../UI/SelectInput";
import { HOME_DROPDOWN_DEFAULT_VALUE } from "../../config/Constants";
import FormControl from "@material-ui/core/FormControl";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  formControl: {
    display: "flex",
  },
});

function TechGroupSelectInput() {
  const setResponse = useSetRecoilState(setLastResponseState);
  const setGroupsFetchAlerts = useSetRecoilState(checkGroupsFetchAlerts);

  const classes = useStyles();

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
    <FormControl variant="outlined" className={classes.formControl}>
      <SelectInput
        list={allTechGroups}
        value={selectValue}
        handleChange={handleChange}
      />
    </FormControl>
  );
}

export default TechGroupSelectInput;
