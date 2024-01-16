import mongoose from "mongoose";
import { Schema } from "mongoose";

const ModelGroupSchema = new Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        immutable: true
    },
    modelGroup: {
        type: String,
        require:true,
        enum: ['A','B','C','D','E'],
        unique: true
    },
    votes: {
        type: Number,
        default: 0
    }
})

// ModelGroupSchema.index({modelGroup: 1, bridgePart: 1}, {unique:true});

export const ModelGroupModel = mongoose.model('ModelGroup',ModelGroupSchema);

/**
 * @swagger
 * components:
 *  schemas:
 *    ModelGroup:
 *      type: object
 *      required:
 *        - modelGroup
 *      properties:
 *        id:
 *          type: string
 *          description: The MongoDB autogenerated ID of the group's IFC model.
 *        modelGroup:
 *          type: string
 *          enum: [A, B, C, D, E]
 *          description: The group name which owns the IFC model.
 *        votes:
 *          type: number
 *          default: 0
 *          description: The number of votes a model gets.
 */