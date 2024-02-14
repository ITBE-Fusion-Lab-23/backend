import express from "express";
import { ModelGroupModel } from "../schemas/ModelSchema.js";
import { UserModel } from "../schemas/UserSchema.js";
import { jwtCheck } from "../config.js";
import mongoose from "mongoose";
import { createUser, parseJwt } from "../helper.js";

const router = express.Router();

router.get("/", async (req, res) => {
  await ModelGroupModel.find({}).then((result) => {
    if (!result) {
      res.status(400).send("No model found!");
      return;
    }
    res.status(200).send(result);
  });
});

router.put("/:modelGroup/vote", jwtCheck, async (req, res) => {
  const userEmail = parseJwt(req.headers.authorization)[
    "https://reviews-api.com/email"
  ];
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    //checks if user has already voted
    await UserModel.findOne({ email: userEmail }).then((result) => {
      if (result.votedModel) {
        res
          .status(400)
          .send({ error: `You have voted for Group ${result.votedModel}` });
        throw new Error(
          "User has already voted and cannot change their vote anymore."
        );
      }
    });

    await ModelGroupModel.findOneAndUpdate(
      { modelGroup: req.params.modelGroup },
      { $inc: { votes: 1 } },
      { new: true },
      { session }
    ).then((result) => {
      if (!result) {
        res.status(400).send("No model found with the specified model group.");
        return;
      }
      res.status(200).json({
        message: "Handling PUT request to /modelGroup",
        updatedModelGroup: result,
      });
    });
    if (userEmail) {
      await UserModel.findOneAndUpdate(
        { email: userEmail },
        { $set: { votedModel: req.params.modelGroup } },
        { new: true },
        { session }
      ).then(async (result) => {
        if (!result) {
          await createUser(userEmail, {
            votedModel: req.params.modelGroup,
          });
        } else {
          console.log(result);
        }
      });
    }
    await session.commitTransaction();
  } catch (error) {
    console.error(error);
    await session.abortTransaction();
  }
  session.endSession();
});
export default router;
