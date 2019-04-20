const { db }  = require('./index.js');
const { Restaurant } = require('./index.js');
const faker = require('faker');
const fs = require('fs') 
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
let data = []
const csvWriter = createCsvWriter({
    path: './data.csv',
    header: [
        {id: 'id', title: 'id'},
        {id: 'name', title: 'name'},
        {id: 'description', title: 'description'},
        {id: 'images', title: 'images'},
        {id: 'reviews', title: 'reviews'},
        {id: 'tags', title: 'tags'},
        {id: 'priceStart', title: 'priceStart'},
        {id: 'priceEnd', title: 'priceEnd'},
        {id: 'type', title: 'type'},
        

    ]
});

const cuisine = ['Japanese', 'Korean', 'Chinese', 'French', 'German', 'American', 'Mexican', 'Vietnamese', 'Taiwanese', 'Brazilian', 'Italian', 'Martian', 'Connecticotian', 'Indian', 'Jamaican', 'Seafood', 'Ethiopian', 'Mediterranean', 'Californian'];
for (var i = 1; i <= 10000000; i++){

const photoArray = [];
const randPhotoNum = Math.floor(Math.random() * 35 + 10);
const randTagNum = Math.floor(Math.random() * 10 + 3);
const randCuiNum = Math.floor(Math.random() * 2 + 1);
for (var j = 0; j < randPhotoNum; j++){
  var randomNum = Math.floor(Math.random() * 25 + 1);
  photoArray.push({imageUrl: `https://s3-us-west-1.amazonaws.com/hrsf113fec/${randomNum}.jpg`, caption: faker.random.word() + faker.date.past()})

}

const tags = [];
for(var j = 0; j < randTagNum + 5; j++){
  tags.push(faker.random.word())
}

const types = [];
for(var j = 0; j < randCuiNum; j++){
  var randCuisineIndex = Math.floor(Math.random() * cuisine.length);
  types.push(cuisine[randCuisineIndex])
}


const samplePosts = { 
    id: i,
    name: faker.random.word(),
    description: faker.lorem.paragraphs(3),
    images: JSON.stringify(photoArray),
	reviews: faker.random.number({min: 1, max: 999}),
	rating: faker.random.number({min: 2, max: 5, precision: 0.01}),
	tags: JSON.stringify(tags),
    priceStart: faker.random.number({min: 3, max: 10}),
    priceEnd: faker.random.number({min: 11, max: 30}),
	type: JSON.stringify(types)
};
data.push(samplePosts);
}

csvWriter.writeRecords(data)       // returns a promise
   .then(() => {
        console.log('...Done');
    })
    .catch(e => console.log('err: ', e))

