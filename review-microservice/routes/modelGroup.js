import express from "express";
import { ModelGroupModel } from "../schemas/ModelSchema.js";

const router = express.Router();

router.put("/:modelGroup", async (req, res) => {
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

export default router;
