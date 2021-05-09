import { Container } from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import { MuiThemeProvider } from "@material-ui/core/styles";
import { ThemeProvider } from "styled-components";
import theme from "../styles/theme";
import GlobalStyle from "../styles/global";
import { useRecoilValue } from "recoil";
import { activeViewState } from "../state/atoms";
import Home from "../views/Home";
import UserEdit from "../views/UserEdit";

function App() {
  const activeView = useRecoilValue(activeViewState);
  const views = {
    home: Home,
    user: UserEdit,
  };
  const View = views[activeView];

  return (
    <MuiThemeProvider theme={theme}>
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="lg">
          <CssBaseline />
          <GlobalStyle />
          <View />
        </Container>
      </ThemeProvider>
    </MuiThemeProvider>
  );
}

export default App;
