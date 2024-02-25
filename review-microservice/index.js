import express from "express";
import mongoose, { model } from "mongoose";
import { ReviewModel } from "./schemas/ReviewSchema.js";
import bodyParser from "body-parser";
import rateLimit from "express-rate-limit";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { ModelGroupModel } from "./schemas/ModelSchema.js";
import { options } from "./config.js";
import modelGroupRouter from "./routes/modelGroup.js";
import reviewRouter from "./routes/reviews.js";
import userRouter from "./routes/user.js";
import cors from "cors";
import { UserModel } from "./schemas/UserSchema.js";
// import https from "https";
// import fs from "fs";

const specs = swaggerJSDoc(options);

//Create a new express app
const app = express();

// const privateKey = fs.readFileSync("./key.pem", "utf8");
// const certificate = fs.readFileSync("./cert.pem", "utf8");
// const credentials = { key: privateKey, cert: certificate };

// const httpsServer = https.createServer(credentials, app);

//API rate limiter (20 requests per minute for each IP)
const apiLimiter = rateLimit({
  windowMs: 60 * 1000, //1 minute
  max: 20, //Limit each IP to 20 requests per minute
});

//Use bodyParser middleware to be able to parse request body data and apiLimiter to rate limit API requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(apiLimiter);

//add cors
app.use(cors());

// Swagger UI Express middleware for API Documentation
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

// req.isAuthenticated is provided from the auth router
app.get("/", (req, res) => {
  res.send("Working API");
});

//Try to connect Mongoose to MongoDB with CONN_STR environment variable
try {
  const conn = await mongoose.connect(process.env.CONN_STR);
  console.log("Connected to mongoDB server!");
} catch (e) {
  console.error(e);
}

//Create collection for reviews
await ReviewModel.createCollection();

//Create collection for models
await ModelGroupModel.createCollection();

//Create collection for users
await UserModel.createCollection();

//Initialize database with 5 model groups
await ModelGroupModel.findOne({}).then((result) => {
  if (result) return;
  ModelGroupModel.insertMany([
    { modelGroup: "A", votes: 0 },
    { modelGroup: "B", votes: 0 },
    { modelGroup: "C", votes: 0 },
    { modelGroup: "D", votes: 0 },
    { modelGroup: "E", votes: 0 },
  ]).then(() => {
    console.log("Database Initialized");
  });
});

app.get("/", (_, res) => {
  res.send("App is working!");
});

app.use("/review", reviewRouter);

app.use("/modelGroup", modelGroupRouter);

app.use("/user", userRouter);

app.listen(3000, (err) => {
  err
    ? console.log("Error in server setup.")
    : console.log("Server listening on Port", 3000);
});

export default app;
