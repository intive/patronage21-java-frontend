import React from 'react';
import { Container } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import TitleContainer from './TitleContainer';
import UsersContainer from './UsersContainer';
import { MuiThemeProvider } from '@material-ui/core/styles';
import theme from '../styles/theme'

function App() {
  const title = "Użytkownicy";
  const info = "Poniżej wylistowani zostali użytkownicy Patronage, liderzy oraz uczestnicy."
  const users = [
    {
      "firstName": "Jan",
      "lastName": "Kowalski",
      "email": "jan.kowalski@gmail.com",
      "phoneNumber": "+48 111-222-333",
      "githubUrl": "GitHub/Jan-Kowalski",
      "userName": "Kowalski",
      "role": "LEADER",
      "status": "ACTIVE"
    },
    {
      "firstName": "Anna",
      "lastName": "Nowak",
      "email": "anna.nowak@gmail.com",
      "phoneNumber": "+48 111-222-333",
      "githubUrl": "GitHub/Anna-Nowak",
      "userName": "Nowak",
      "role": "CANDIDATE",
      "status": "ACTIVE"
    },
    {
      "firstName": "Weronika",
      "lastName": "Wiśniewska",
      "email": "weronika.wisniewska@gmail.com",
      "phoneNumber": "+48 111-222-333",
      "githubUrl": "GitHub/Weronika-Wisniewska",
      "userName": "Wisnieswka",
      "role": "CANDIDATE",
      "status": "ACTIVE"
    },
    {
      "firstName": "Monika",
      "lastName": "Wolna",
      "email": "monika.wolna@gmail.com",
      "phoneNumber": "+48 111-222-333",
      "githubUrl": "GitHub/Monika-Wolna",
      "userName": "Wolna",
      "role": "LEADER",
      "status": "ACTIVE"
    },
    {
      "firstName": "Borys",
      "lastName": "Balotnikow",
      "email": "borys.balotnikow@gmail.com",
      "phoneNumber": "+48 111-222-333",
      "githubUrl": "GitHub/Borys-Balotnikow",
      "userName": "Balotnikow",
      "role": "LEADER",
      "status": "ACTIVE"
    },
    {
      "firstName": "Filip",
      "lastName": "Krzewiński",
      "email": "filip.krzewinski@gmail.com",
      "phoneNumber": "+48 111-222-333",
      "githubUrl": "GitHub/Filip-Krzewinski",
      "userName": "Krzewinski",
      "role": "CANDIDATE",
      "status": "INACTIVE"
    },
    {
      "firstName": "Patryk",
      "lastName": "Bikowski",
      "email": "patryk.bikowski@gmail.com",
      "phoneNumber": "+48 111-222-333",
      "githubUrl": "GitHub/Patryk-Bikowski",
      "userName": "Bikowski",
      "role": "CANDIDATE",
      "status": "INACTIVE"
    },
  ]
  const techGroups = [
    {
      "value": "all",
      "name": "Wszystkie grupy technologiczne"
    },
    {
      "value": "android",
      "name": "Android"
    },
    {
      "value": "java",
      "name": "Java"
    },
    {
      "value": "javaScript",
      "name": "JavaScript"
    },
    {
      "value": "qa",
      "name": "QA"
    }
  ];

  return (
    <MuiThemeProvider theme={theme}>
      <Container component="main" maxWidth="lg">
        <CssBaseline />
        <TitleContainer title={title} info={info}></TitleContainer>
        <UsersContainer users={users} techGroups={techGroups}></UsersContainer>
      </Container>
    </MuiThemeProvider>
  );
}

export default App;
