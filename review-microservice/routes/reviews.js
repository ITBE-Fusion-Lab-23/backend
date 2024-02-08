import express from "express";
import { ModelGroupModel } from "../schemas/ModelSchema.js";
import { ReviewModel } from "../schemas/ReviewSchema.js";
import { body, validationResult } from "express-validator";
import mongoose from "mongoose";
import { jwtCheck } from "../config.js";
import { createUser, parseJwt } from "../helper.js";
import { UserModel } from "../schemas/UserSchema.js";

const router = express.Router();

const session = mongoose.startSession();

router.get("/:modelGroup", (req, res) => {
  ModelGroupModel.findOne({ modelGroup: req.params.modelGroup }).then(
    (tempresult) => {
      if (tempresult) {
        ReviewModel.find({ modelGroupId: tempresult._id })
          .populate("modelGroupId")
          .then((result) => {
            res.send(result);
          });
      } else {
        res
          .status(400)
          .send("Bad request. modelGroup can only be A, B, C, D, or E");
      }
    }
  );
});

router.post(
  "/:modelGroup",
  [body("comment").not().isEmpty().trim().escape()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(404).json({ errors: errors.array() });
    let modelGroupId;

    await session.then((_session) => {
      _session.withTransaction(async () => {
        //Find specified model
        try {
          const modelGroup = await ModelGroupModel.findOne({
            modelGroup: req.params.modelGroup,
          });
          if (!modelGroup) {
            res.status(400).send("No object found with specified model group.");
            return;
          }
          modelGroupId = modelGroup._id;
        } catch (err) {
          console.error(err);
          res.status(500).send("Server error");
        }
        //Create review model object
        const review = new ReviewModel({
          _id: new mongoose.Types.ObjectId(),
          stakeholder: req.body.stakeholder,
          rating: req.body.rating,
          component: req.body.component,
          comment: req.body.comment,
          modelGroupId: modelGroupId,
        });
        //Handle POST request to /reviews
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
      });
    });
  }
);

router.put("/:reviewId/likes/:operation", jwtCheck, async (req, res) => {
  let op;
  let mongoOpt;
  //determine to increment or decrement based on operation
  if (req.params.operation == "inc") {
    op = 1;
    mongoOpt = {
      $addToSet: {
        likedReviewsId: req.params.reviewId,
      },
    };
  } else if (req.params.operation == "dec") {
    op = -1;
    mongoOpt = {
      $pull: {
        likedReviewsId: req.params.reviewId,
      },
    };
  } else {
    res
      .status(400)
      .send("Bad request, use /inc to add a like, /dec to remove a like.");
    return;
  }
  await session.then((_session) => {
    _session.withTransaction(async () => {
      await ReviewModel.findOneAndUpdate(
        { _id: new mongoose.Types.ObjectId(req.params.reviewId) },
        { $inc: { likes: op } },
        { new: true }
      ).then((result) => {
        if (!result) {
          res.status(400).send("No reviews found with specified ID");
          return;
        }
        res.status(200).json({
          message: "Handling PUT request to /reviews",
          updatedReview: result,
        });
      });
      //Handle PUT request to /user
      const userEmail = parseJwt(req.headers.authorization)[
        "https://reviews-api.com/email"
      ];
      if (userEmail) {
        await UserModel.findOneAndUpdate({ email: userEmail }, mongoOpt, {
          new: true,
        }).then(async (result) => {
          if (!result) {
            await createUser(userEmail, {
              likedReviewsId: req.params.reviewId,
            });
          } else {
            console.log(result);
          }
        });
      }
    });
  });
});

router.put("/:reviewId/removeLike", jwtCheck, async (req, res) => {
  await ReviewModel.findOneAndUpdate(
    { _id: new mongoose.Types.ObjectId(req.params.reviewId) },
    { $inc: { likes: -1 } },
    { new: true }
  ).then((result) => {
    if (!result) {
      res.status(400).send("No reviews found with specified ID");
      return;
    }
    res.status(200).json({
      message: "Handling PUT request to /reviews",
      updatedReview: result,
    });
  });
});

export default router;
