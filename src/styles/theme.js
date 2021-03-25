import { createMuiTheme } from '@material-ui/core/styles'

const theme = createMuiTheme({
    palette: {
        primary: {
            main: "#52bdff"
        }
    },
    overrides: {
        MuiCssBaseline: {
            "@global": {
                body: {
                    backgroundColor: "#fff",
                    fontFamily: `"Helvetica", sans-serif`,
                    fontSize: 13
                },
            },
        }
    },
    typography: {
        "fontFamily": `"Helvetica", sans-serif`,
        "fontSize": 13
       }
})
export default theme