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
