# Patronative
Jest to webowy moduł aplikacji Patronative wspierający zarządzanie użytkownikami projektu Intive Patronage.

## Technologie
- React 17
- Material-UI 4.11
- styled-components 5.2
- Frisbee 3.1
- Recoil 0.2

## Instalacja
1) Instalacja Node.js -> https://nodejs.org (zainstaluje się też wtedy menadżer pakietów npm) 
2) Następnie, aby upewnić się że instalacja przebiegła poprawnie, w wierszu poleceń należy wpisać:

```
node -v
npm -v
``` 
System powinien wyświetlić wersję Node.js i npm

3) Zainstalować niezbędne pakiety przy użyciu npm.

```
cd patronage21-java-frontend
npm ci
```

4) Stworzyć plik '.env' w który będzie podana ścieżka do integracja z systemami
```
REACT_APP_USER_MODULE_URL= Adres modułu użytkownika
```

## Generowanie statycznych stron błędów
Aby wygenerować statyczne strony błędów należy użyć polecenia (wymagane są zainstalowane niezbędne pakiety - npm ci):
```
npm run-script generate-error-pages
```

## Wymagania
- Node.js 12+
- npm 6+

## Uruchamianie
Aby uruchomić projekt, należy w wieszu poleceń wpisać komendy:

```
cd patronage21-java-frontend
npm start
```

Aplikacja będzie dostępna pod adresem http://localhost:3000 w przeglądarce internetowej.