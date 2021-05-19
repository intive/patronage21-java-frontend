import { useRecoilValue } from "recoil";
import { alertState } from "../../state/atoms";
import { Alert, AlertTitle } from "@material-ui/lab";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import { USER_PROPERTIES } from "../../config/Constants";
import styled from "styled-components";
import Content from "./Layout/Content";

const StyledAlert = styled(Alert)`
  margin-bottom: 20px;
`;

const FieldName = styled.strong`
  margin-right: 5px;
`;

function AlertFrame() {
  const alert = useRecoilValue(alertState);

  const getAlerts = () =>
    alert.content.violationErrors.map((error) => (
      <ListItem style={{ alignItems: "start" }} key={error.fieldName}>
        <FieldName>{USER_PROPERTIES[error.fieldName] + ":"}</FieldName>
        {error.message}
      </ListItem>
    ));

  return (
    <Content>
      <StyledAlert severity={alert.severity}>
        <AlertTitle>{alert.title}</AlertTitle>
        {alert.content && alert.content.violationErrors ? (
          <List>{getAlerts()}</List>
        ) : (
          alert.content
        )}
      </StyledAlert>
    </Content>
  );
}

export default AlertFrame;
