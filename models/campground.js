import mongoose from "mongoose";

const Schema = mongoose.Schema;

const campgroundSchema = new Schema({
    title: String,
    price: String,
    description: String,
    location: String
});


export default mongoose.model('Campground', campgroundSchema);
