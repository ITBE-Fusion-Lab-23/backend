import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import mongoose from 'mongoose';
import { reviewSchema } from './schemas/reviewSchema.js';
import bodyParser from 'body-parser';

//Create a new express app
const app = express();

//Use bodyParser middleware to be able to parse request body data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

//Try to connect Mongoose to MongoDB with CONN_STR environment variable
try {
    console.log(process.env.CONN_STR);
    await mongoose.connect(process.env.CONN_STR);
    console.log("Connected to mongoDB server!")
} catch(e){
    console.error(e);
}
//Create mongoose model based on pre-defined imported schema
const ReviewModel = mongoose.model('Review', reviewSchema);

//Create collection for reviews
await ReviewModel.createCollection();

//Get reviews based on ifcGroup
app.get('/reviews/:ifcGroup', (req,res) => {
    const result = ReviewModel.find({ifcGroup:req.params.ifcGroup}).then(result => 
        {
            res.send(result)
        }
    ).catch(e => {
        console.error(e);
    })
})

app.post('/reviews', (req,res) => {
    console.log(req.body)
    const review = new ReviewModel({
        _id: new mongoose.Types.ObjectId(),
        email: req.body.email,
        ageGroup: req.body.ageGroup,
        rating: req.body.rating,
        comment: req.body.comment,
        date: Date.now(),
        bridgePart: req.body.bridgePart
    })
    review.save().then(result => {
        console.log(result);
        res.status(201).json({
            message: "Handling POST request to /reviews",
            createdReview: result
        })
    }).catch(err => {
        console.log(err);
        res.status(500).json({
            error:err
        });
    });
})

app.listen(3000, (err)=> {
    err ? console.log("Error in server setup.") : console.log("Server listening on Port", 3000);
});