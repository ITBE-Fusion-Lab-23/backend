import mongoose from "mongoose";
import { Router } from "express";
import { jwtCheck } from "../config.js";
import { UserModel } from "../schemas/UserSchema.js";
import { parseJwt } from "../helper.js";

const router = Router();

router.get("/:accessToken", jwtCheck, (req, res) => {
  const authHeader = `Bearer ${req.params.accessToken}`;
  const email = parseJwt(authHeader)["https://reviews-api.com/email"];
  UserModel.findOne({ email: email })
    .populate("votedModel")
    .then((result) => {
      if (!result) {
        res.status(400).send("No user found with specified email!");
        return;
      }
      res.status(200).json({ user: result });
    });
});

export default router;
