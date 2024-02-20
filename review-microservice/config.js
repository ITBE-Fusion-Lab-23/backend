import { auth } from "express-oauth2-jwt-bearer";

export const jwtCheck = auth({
  audience: "https://reviews-api.com/",
  issuerBaseURL: "https://neuedonnersbergerbruecke.eu.auth0.com/",
  tokenSigningAlg: "RS256",
});

export const options = {
  definition: {
    openapi: "3.1.0",
    info: {
      title: "Neue Donnersbergerbruecke API with Swagger",
      version: "0.1.0",
      description:
        "This is a simple CRUD API application made with Express and documented with Swagger",
      license: {
        name: "MIT",
        url: "https://spdx.org/licenses/MIT.html",
      },
      contact: {
        name: "Neue Donnersbergerbruecke",
        url: "https://google.com", //placeholder
        email: "info@email.com",
      },
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
  },
  apis: ["./schemas/*.js"],
};

export const auth0Config = {
  authRequired: false,
  auth0Logout: true,
  secret: "42f4728f06170257d82f3314afd13c22aa46e157493355c585d3f7b1d148793e",
  baseURL: "http://localhost:3000",
  clientID: "kw7f2DqEfVqCNeIoYnY8d0C6mDmsv8G3",
  issuerBaseURL: "https://neuedonnersbergerbruecke.eu.auth0.com",
};
