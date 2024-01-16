import express from "express";
import mongoose, { model } from "mongoose";
import { ReviewModel } from "./schemas/ReviewSchema.js";
import bodyParser from "body-parser";
import { body, validationResult } from "express-validator";
import rateLimit from "express-rate-limit";
import { auth } from "express-openid-connect";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { ModelGroupModel } from "./schemas/ModelSchema.js";
import { options, auth0Config } from "./config.js";

const specs = swaggerJSDoc(options);

//Create a new express app
const app = express();

//API rate limiter (20 requests per minute for each IP)
const apiLimiter = rateLimit({
  windowMs: 60 * 1000, //1 minute
  max: 20, //Limit each IP to 20 requests per minute
});

//Use bodyParser middleware to be able to parse request body data and apiLimiter to rate limit API requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(apiLimiter);
// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(auth0Config));

// Swagger UI Express middleware for API Documentation
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

// req.isAuthenticated is provided from the auth router
app.get("/", (req, res) => {
  res.send(req.oidc.isAuthenticated() ? "Logged in" : "Logged out");
});

//Try to connect Mongoose to MongoDB with CONN_STR environment variable
try {
  await mongoose.connect(process.env.CONN_STR);
  console.log("Connected to mongoDB server!");
} catch (e) {
  console.error(e);
}

//Create collection for reviews
await ReviewModel.createCollection();

//Create collection for models
await ModelGroupModel.createCollection();

app.get("/", (_, res) => {
  res.send("App is working!");
});

app.get("/callback", (_, res) => {
  res.send("Login worked!");
});

//Get reviews based on modelGroup
app.get("/reviews/:modelGroup", (req, res) => {
  ModelGroupModel.findOne({ modelGroup: req.params.modelGroup }).then(
    (tempresult) => {
      ReviewModel.find({ modelGroupId: tempresult._id })
        .populate("modelGroupId")
        .then((result) => {
          res.send(result);
        });
    }
  );
});

app.post(
  "/reviews/:modelGroup/",
  [body("comment").not().isEmpty().trim().escape()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(404).json({ errors: errors.array() });

    let modelGroupId;
    try {
      const modelGroup = await ModelGroupModel.findOne({
        modelGroup: req.params.modelGroup,
      });
      if (!modelGroup) {
        res.status(404).send("No object found with specified model group.");
      }
      modelGroupId = modelGroup._id;
    } catch (err) {
      console.error(err);
      res.status(500).send("Server error");
    }

    const review = new ReviewModel({
      _id: new mongoose.Types.ObjectId(),
      stakeholder: req.body.stakeholder,
      rating: req.body.rating,
      component: req.body.component,
      comment: req.body.comment,
      modelGroupId: modelGroupId,
    });
    try {
      const result = await review.save();
      console.log(result);
      res.status(201).json({
        message: "Handling POST request to /reviews",
        createdReview: result,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    }
  }
);

//Add vote to a specific model group
app.put("/modelGroup/:modelGroup", async (req, res) => {
  await ModelGroupModel.findOneAndUpdate(
    { modelGroup: req.params.modelGroup },
    { $inc: { votes: 1 } },
    { new: true }
  ).then((result) => {
    if (!result) {
      res.status(400).send("No model found with the specified model group.");
    }
    res.status(200).json({
      message: "Handling PUT request to /modelGroup",
      updatedModelGroup: result,
    });
  });
});

app.listen(3000, (err) => {
  err
    ? console.log("Error in server setup.")
    : console.log("Server listening on Port", 3000);
});