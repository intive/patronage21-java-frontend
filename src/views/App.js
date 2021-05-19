import CssBaseline from "@material-ui/core/CssBaseline";
import { MuiThemeProvider } from "@material-ui/core/styles";
import { ThemeProvider } from "styled-components";
import theme from "../styles/theme";
import GlobalStyle from "../styles/global";
import { useRecoilValue } from "recoil";
import { activeViewState } from "../state/atoms";
import Home from "../views/Home";
import UserEdit from "../views/UserEdit";
import Content from "../components/UI/Layout/Content";
import UserHeader from "../components/UI/Navigation/UserHeader";

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
        <CssBaseline />
        <GlobalStyle />
        <UserHeader />
        <Content>
          <View />
        </Content>
      </ThemeProvider>
    </MuiThemeProvider>
  );
}

export default App;
