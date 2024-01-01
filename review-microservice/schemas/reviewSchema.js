import { ObjectId } from "mongodb";
import mongoose from "mongoose";
import { Schema } from "mongoose";

export const reviewSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    email: {
        type: String,
        require: true
    },
    ageGroup: {
        type: Number,
        min: 1,
        max: 10
    },
    rating: {
        type: Number,
        require: true,
        min:1,
        max:5
    },
    comment: String,
    date: {
        type: Date,
        default: Date.now()
    },
    ifcGroup: {
        type: String, //change to objectID later
        require: true
    }
})

