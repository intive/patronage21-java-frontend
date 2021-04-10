import React from "react";
import { RecoilRoot } from "recoil";
import { Container } from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import { MuiThemeProvider } from "@material-ui/core/styles";
import { ThemeProvider } from "styled-components";
import theme from "../styles/theme";
import GlobalStyle from "../styles/global";

function App({ Component, pageProps }) {
  return (
    <MuiThemeProvider theme={theme}>
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="lg">
          <CssBaseline />
          <GlobalStyle />
          <RecoilRoot>
            <Component {...pageProps} />
          </RecoilRoot>
        </Container>
      </ThemeProvider>
    </MuiThemeProvider>
  );
}

export default App;
