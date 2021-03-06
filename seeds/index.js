const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true
})

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Database connected');
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 200; i++) {
        const random = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            //Your USER Id
            author: '6224e5f4868bbdd88f8ac608',
            location: `${cities[random].city}, ${cities[random].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Illo modi assumenda fugit? Numquam, sit suscipit nihil natus voluptatem quo voluptates inventore provident at, commodi dolore consectetur tempore eaque, neque consequuntur.',
            price,
            geometry: {
                type: "Point",
                coordinates: [cities[random].longitude, cities[random].latitude]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/dktnlez2j/image/upload/v1646914442/YelpCamp/r71etsaqecepwr72db48.jpg',
                    filename: 'YelpCamp/r71etsaqecepwr72db48',
                },
                {
                    url: 'https://res.cloudinary.com/dktnlez2j/image/upload/v1646914442/YelpCamp/in8jjszbzcthsmtysjol.jpg',
                    filename: 'YelpCamp/in8jjszbzcthsmtysjol',
                },
                {
                    url: 'https://res.cloudinary.com/dktnlez2j/image/upload/v1646914442/YelpCamp/trceoup4dfymtauqaqud.jpg',
                    filename: 'YelpCamp/trceoup4dfymtauqaqud',
                }
            ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})