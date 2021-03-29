import { createServer } from "miragejs";
import { users } from "./users";

export function makeServer({ environment = "test" } = {}) {
  const server = createServer({
    environment,
    routes() {
      this.namespace = "api";
      this.get("/users", (schema) => users);
    },
  });

  return server;
}
