import { unstable_createMuiStrictModeTheme as createMuiTheme } from "@material-ui/core/styles";

const colors = {
  black: "#000000",
  pink: "#cb4173",
  blue: "#2ab6fb",
  lightBlue: "#52bdff",
  lightBlue2: "#eff9ff",
  green: "#89ca35",
  red: "#f30e2b",
  grey: "#9f9f9f",
  white1: "#efefef",
  white2: "#ebf8ff",
};

const MuiTheme = createMuiTheme({
  palette: {
    text: {
      primary: colors.black,
    },
    primary: {
      main: colors.lightBlue,
    },
    secondary: {
      main: colors.pink,
    },
  },
  typography: {
    fontFamily: '"Helvetica", sans-serif',
  },
});

const customPalette = {
  colors: {
    bar: colors.lightBlue2,
  },
};

const theme = {
  ...MuiTheme,
  customPalette,
};

export default theme;
