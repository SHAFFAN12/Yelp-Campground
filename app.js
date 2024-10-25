import express from 'express';
import mongoose from 'mongoose';
import path from 'path';
import { fileURLToPath } from 'url';
import Campground from './models/campground.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

mongoose.connect('mongodb://localhost:27017/yelp-camp')
.then(() => {
    console.log('Connected to MongoDB locally');
}).catch((err) => {
    console.log('Failed to connect to MongoDB:', err);
});

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render("home");
});
app.get('/campground', async (req, res) => {
    try {
        const campgrounds = await Campground.find({});
        res.render('campgrounds/index', { campgrounds });
    } catch (err) {
        console.error('Error fetching campgrounds:', err);
        res.status(500).send('Server Error');
    }
});


app.listen(1000, () => {
    console.log('Server is Running at 1000');
});
