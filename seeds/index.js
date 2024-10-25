import mongoose from 'mongoose';
import Campground from '../models/campground.js';
import cities from './cities.js';
import { places, descriptors } from './seedHelpers.js';

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB locally');
}).catch((err) => {
    console.log('Failed to connect to MongoDB:', err);
});

const sample = (array) => {
    array[Math.floor(Math.random() * array.length)]
}

const seedDb = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
       const randomCity = Math.floor(Math.random() * 1000);
       const camp = new Campground({
        location: `${cities[randomCity].cities} , ${cities[randomCity].state}`,
        title: `${sample(descriptors)} ${sample(places)}`
       });
       await camp.save();
    }
}

seedDb().then(() => {
    mongoose.connection.close();
})