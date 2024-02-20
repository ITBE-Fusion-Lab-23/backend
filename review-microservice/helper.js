import mongoose from "mongoose";
import { UserModel } from "./schemas/UserSchema.js";

export const parseJwt = (token) => {
  return JSON.parse(Buffer.from(token.split(".")[1], "base64").toString());
};

export const createUser = async (userEmail, update) => {
  const newUser = new UserModel({
    _id: new mongoose.Types.ObjectId(),
    email: userEmail,
    reviewsId: update.reviewsId ? [update.reviewsId] : [],
    likedReviewsId: update.likedReviewsId ? [update.likedReviewsId] : [],
    votedModel: update.votedModel ? update.votedModel : null,
  });
  try {
    const result = await newUser.save();
    console.log({
      message: "Created a new User",
      createdUser: result,
    });
  } catch (err) {
    console.error(err);
  }
};
