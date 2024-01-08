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
    apis: ["./schemas/*.js"]
  };

export const auth0Config = {
    authRequired: false,
    auth0Logout: true,
    secret: 'a long, randomly-generated string stored in env',
    baseURL: 'http://localhost:3000',
    clientID: 'kw7f2DqEfVqCNeIoYnY8d0C6mDmsv8G3',
    issuerBaseURL: 'https://neuedonnersbergerbruecke.eu.auth0.com'
};