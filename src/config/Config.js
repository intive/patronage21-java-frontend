const dev = {
  API_URL: "http://93.115.20.69:9001",
};
const localDev = {
  API_URL: "http://localhost:8080/frontend-api",
};
export const config = process.env.NODE_ENV === "development" ? localDev : dev;
