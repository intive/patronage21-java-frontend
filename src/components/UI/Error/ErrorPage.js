import React from "react";
import {
  ErrorScreenWrapper,
  StyledButton,
  ErrorTitle,
  StyledImage,
} from "./style";
import {
  USER_PANEL_MODULE_URL,
  BREADCRUMBS_HOME,
  BACK_BTN_TEXT,
} from "../../../config/Constants";

export default function ErrorPage({ title, description, isReturn }) {
  return (
    <ErrorScreenWrapper>
      <ErrorTitle>{title}</ErrorTitle>
      <p>{description}</p>

      <StyledButton
        variant="contained"
        color="secondary"
        href={USER_PANEL_MODULE_URL}
      >
        {BREADCRUMBS_HOME}
      </StyledButton>
      {isReturn && (
        <StyledButton
          variant="contained"
          color="primary"
          data-p4tron4tiv3-placeholder="onClick"
        >
          {BACK_BTN_TEXT}
        </StyledButton>
      )}
      <StyledImage>
        <img
          src="patronage-cat-error.svg"
          alt="Patrocat error"
          width={300}
          height={300}
        /> 
      </StyledImage>
    </ErrorScreenWrapper>
  );
}
