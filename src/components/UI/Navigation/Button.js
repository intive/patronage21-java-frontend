import React from "react";
import { Button as MuiButton } from "@material-ui/core";
import styled from "styled-components";

const StyledButton = styled(MuiButton)`
  text-transform: none;
  font-size: 14px;
  padding: 8px 5px;
  border-radius: 40px;
  font-weight: 600;
  letter-spacing: 0.2px;
`;

export default function Button(props) {
  const button = (
    <StyledButton variant="contained" {...props}>
      {props.children}
    </StyledButton>
  );
  return button;
}
