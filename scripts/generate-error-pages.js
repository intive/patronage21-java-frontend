import * as fs from "fs";
import prettier from "prettier";
import React from "react";
import ReactDOMServer from "react-dom/server";
import { ServerStyleSheet } from "styled-components";
import ErrorPage from "../src/components/UI/Error/ErrorPage";
import Content from "../src/components/UI/Layout/Content";
import {
  ServerStyleSheets,
  ThemeProvider as MuiThemeProvider,
} from "@material-ui/core/styles";
import { ThemeProvider } from "styled-components";
import CssBaseline from "@material-ui/core/CssBaseline";
import GlobalStyle from "../src/styles/global";
import theme from "../src/styles/theme";
import AppHeader from "../src/components/UI/Navigation/AppHeader";
import { ERROR_PAGE_GENERAL_TITLE } from "../src/config/Constants";

function renderFullPage(htmlAndStyles, status, body) {
  const { html, muiCss, scStyle } = htmlAndStyles;
  const errorData = {
    'data-p4tron4tiv3-placeholder="onClick"': 'onClick="window.history.back()"',
    "p4tron4tiv3-placeholder-status": status,
    "p4tron4tiv3-placeholder-body": body,
  };

  const htmlWithErrorData = html.replace(
    /data-p4tron4tiv3-placeholder="onClick"|p4tron4tiv3-placeholder-status|p4tron4tiv3-placeholder-body/g,
    function (matched) {
      return errorData[matched];
    }
  );

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8" />
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
        <link rel='preconnect' href='https://fonts.gstatic.com' />
        <link rel='shortcut icon' href='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAEn0lEQVRYR+1WR0hsZxg90xzN2AYddSxR3lgQK6JojCIRjbETC25058aFCSTgMhC3ATHLLFwYshIMgmN5sUWxgQV9WLBrJBYsz95LOD9c8TlXxyck2fjDhblz7/9/5/u+851zFbe3t7f4H5fiFcBrBR5WgJxcWlqCr68vVCoV9vf3cXV1BRcXl3+FqhYkPD8/R0VFBcrKyhAUFISLiwtcXl7C3t7+vwHACvBi0IWFBXh7e2N9fR21tbWorKyEWq3+KCA8Z29vDwcHBzCZTBZ7Zcfw8PAQGxsb2N7eRl9fH0pLS7G8vIzw8HAolcpnA7i+vhYtrK6uRklJCfz9/aFQKD7YLwuAFWDpT09PMTAwgK2tLRQUFMDW1vbZAHgGg5vNZjg5OSE1NVXsf7ieFCKSr7W1FQkJCWhsbBQgSExpMcObmxsBipnxGQPz99nZGRoaGlBYWIj29nakp6d/sFc640kADNDU1ITMzEycnJyIdvDw+9fc3ByMRiN0Op0Ifl/Zk5KSoNFo0NLSgoyMDNnqPQmA2XFzWlqaLPkYbGhoCH5+fjAYDBb9ZZZMglUkgIf953OrXtDb24vQ0FA4Oztb9I8ARkZGxKS4u7vLBtjZ3cX01JRoo9yyCoAjuLq6iqioKLGf5GRZOY7MaHR0FAY3A9yMBihuNPj77Sjs9U7Qh72Bwk6F4XfD+NTNC0Yfz5cBkNoQERGB/v5+UdKwsDCEhISIA8fHx+Hk7ARvby9s/zmPnu9/hlptg1uDDrm//oC20S6kfvElNFrNywCwzBwlNzc3MU4rKyvY3NxEcXGxqMDExAQ+0dnCx+gL89c/wivchPdGexz81oYccxXejnQh86ssqNXy+mG1BcyYRAwICMDY2Bg8PT0F02NjY4XCEYzWTgOdsysuGicw/Mvv0HsZsbfyF7LMP6FruAupGWnQqLQvqwBb0NHRgfj4eNF7VoCk43hSKdmai4szzM/Mw9XFHd4zR7DzcIXP55FQ+erR1fkH0tPSoFTJS7hFBSQhuT/Pi4uLQliCg4NBs6qvr0dKSgocHR1RVVUFlVKBb777Fgc779HZ1Y3snByodLY42t3D3Owc4uM+g1JlpQUMyMMpn2Q+syPjY2JiRO87OzsRGRmJtrY25Obm3rnj1NQUtFotTKY3UECBo+NjwZnExERRLTqqq6vro/5xV4Hj42OhdAzm4eEhSCeNGsHV1NQIscnKyhKtoPzyf3KElyTR/J/3BDo7O4vy8nJZCbaQYklGJbXiPV1xenoa0dHR6O7uFtWhqUjfBpLhcDz5LC8vDzY2NqKS5A35k52dLStQj3oBDYi639PTI7JkKbns7OwED2gsrBKVTTIfZsx3uXdwcBA7OztITk6GXq+3at0WJCTqtbU1ODg4CIOhJdMJi4qK7spOjrBdFCN6PIFMTk5iZmYGcXFxYkokw7KGQBYANxEIM6qrq0N+fr4Ac9+GWX4SkC3iol8EBgYKkJI9Wwv+qBlJ5OK4sec0IrkvIQkk35eI+Zyg99+RVUIe3NzcLESGynf/I+RjA1h7/9FPMjKZjH5uL60Feuy5VS946cHP3fcK4B9X+a+/1W2GFQAAAABJRU5ErkJggg==' />
        <link href='https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;700&display=swap' rel='stylesheet' />
        <meta name="description" content="Error page" />
        <title>Patron-a-tive</title>
        <style id="mui-styles">${muiCss}</style>
        ${scStyle}
      </head>
      <body>
        <div id="root">${htmlWithErrorData}</div>
      </body>
    </html>
  `;
}

export function CustomErrorPage() {
  return (
    <MuiThemeProvider theme={theme}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <GlobalStyle />
        <AppHeader useLogoRedirect={false} />
        <Content>
          <ErrorPage
            title={`${ERROR_PAGE_GENERAL_TITLE} p4tron4tiv3-placeholder-status`}
            description="p4tron4tiv3-placeholder-body"
            isReturn
          />
        </Content>
      </ThemeProvider>
    </MuiThemeProvider>
  );
}

async function readJSONFile(filePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, "utf8", (err, jsonString) => {
      if (err) {
        console.log("Error reading file from disk:", err);
        reject;
        return;
      }
      try {
        const errors = JSON.parse(jsonString);
        resolve(errors);
      } catch (err) {
        console.log("Error parsing JSON string:", err);
        reject;
      }
    });
  });
}

function createDirectory(directory) {
  try {
    if (!fs.existsSync(directory)) {
      fs.mkdirSync(directory);
      console.log("Directory is created.");
    } else {
      console.log("Directory already exists.");
    }
  } catch (err) {
    console.log(err);
  }
}

function copyFile(sourceFile, targetFile) {
  fs.copyFile(sourceFile, targetFile, (err) => {
    if (err) throw err;
    console.log(`${sourceFile} was copied to ${targetFile}`);
  });
}

function getHtmlAndStyles() {
  let html, muiCss, scStyle;
  const styledSheet = new ServerStyleSheet();
  const muiSheets = new ServerStyleSheets();

  try {
    html = ReactDOMServer.renderToString(
      styledSheet.collectStyles(muiSheets.collect(<CustomErrorPage />))
    );
    muiCss = muiSheets.toString();
    scStyle = styledSheet.getStyleTags();
  } catch (error) {
    console.error(error);
  } finally {
    styledSheet.seal();
  }
  return { html, muiCss, scStyle };
}

function createStaticErrorPage(htmlAndStyles, error) {
  let htmlWithStyles = renderFullPage(htmlAndStyles, error.status, error.body);
  let prettyHtml = prettier.format(htmlWithStyles, { parser: "html" });
  let outputFile = `./src/errors/${error.status}.html`;
  fs.writeFileSync(outputFile, prettyHtml);
  console.log(`Wrote ${outputFile}`);
}

createDirectory("./src/errors");
copyFile(
  "./src/components/UI/Error/patronage-cat-error.svg",
  "./src/errors/patronage-cat-error.svg"
);
readJSONFile("./scripts/error-data.json").then((errors) => {
  const htmlAndStyles = getHtmlAndStyles();
  errors.forEach((error) => createStaticErrorPage(htmlAndStyles, error));
});
