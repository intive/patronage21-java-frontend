# Patronative
Jest to webowy moduł aplikacji Patronative wspierający zarządzanie użytkownikami projektu Intive Patronage.

## Technologie
- React 17
- Material-UI 4.11
- styled-components 5.2

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

## Docker
Aplikację można uruchomić w kontenerze dockerowym (wymagany docker -> https://docs.docker.com/get-docker/).
### Tryb developerski
Należy zbudować obraz dockerowy oraz uruchomić kontener z aplikacją.
```
cd patronage21-java-frontend
docker-compose -f docker-compose.dev.yml up -d --build  
```
Aplikacja będzie dostępna pod adresem http://localhost:3001.

Aby zatrzymać kontener należy użyć instrukcji:
```
docker-compose -f docker-compose.dev.yml stop
```
### Tryb produkcyjny
Budowanie obrazu dockerowego oraz uruchamianie kontenera z aplikacją.
```
cd patronage21-java-frontend
docker-compose up -d --build
```
Aplikacja będzie dostępna pod adresem http://localhost:8877.

Zatrzymywanie kontenera:
```
docker-compose stop
```