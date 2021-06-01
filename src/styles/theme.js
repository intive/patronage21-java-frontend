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
  lightGrey: "#fafafa",
  lightGrey2: "#cacaca",
  white1: "#ffffff",
  white2: "#ebf8ff",
};

const MuiTheme = createMuiTheme({
  palette: {
    text: {
      primary: colors.black,
    },
    primary: {
      main: colors.lightBlue,
      contrastText: colors.white1,
    },
    secondary: {
      main: colors.pink,
      contrastText: colors.white1,
    },
  },
});

const customPalette = {
  colors: {
    secondary: colors.blue,
    bar: colors.lightBlue2,
    listItemHovered: colors.lightGrey,
    imageButtonIconBg: colors.white2,
    imageButtonIconBgHover: colors.lightGrey2,
  },
  text: {
    primary: colors.black,
    secondary: colors.grey,
  },
};

const theme = {
  ...MuiTheme,
  customPalette,
};

export default theme;
