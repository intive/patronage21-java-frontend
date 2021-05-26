import styled from "styled-components";
import Button from "../Navigation/Button";

export const ErrorScreenWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ErrorTitle = styled.h1`
  color: ${({ theme }) => theme.customPalette.colors.secondary};
`;

export const StyledButton = styled(Button)`
  width: 250px;
  margin-top: 20px;
`;

export const StyledImage = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 25px;
`;
