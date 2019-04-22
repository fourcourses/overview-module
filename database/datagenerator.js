const faker = require('faker');
const data = require('fs').createWriteStream('database/files/data.csv');
const images = require('fs').createWriteStream('database/files/images.csv');
const tags = require('fs').createWriteStream('database/files/tags.csv');
const types = require('fs').createWriteStream('database/files/types.csv');

const generateData = async (callback) => {
    
    const cuisine = ['Japanese', 'Korean', 'Chinese', 'French', 'German', 'American', 'Mexican',
                    'Vietnamese', 'Taiwanese', 'Brazilian', 'Italian', 'Martian', 'Connecticotian',
                     'Indian', 'Jamaican', 'Seafood', 'Ethiopian', 'Mediterranean', 'Californian'];
    // write headers for every csv file
    data.write('id,name,description,reviews,priceStart,priceEnd\n');
    images.write('id,listingId,imgUrl,caption\n');
    tags.write('id,listingId,tag\n');
    types.write('id,listingId,type\n');
    // create 10m records 
    for(let id = 1; id <= 1e7; id++) {
        // generate random number for photo, tags and cuisines
        const randPhotoNum = Math.floor(Math.random() * 35 + 10);
        const randTagNum = Math.floor(Math.random() * 10 + 3);
        const randCuiNum = Math.floor(Math.random() * 2 + 1);
        // create a random data with faker
        const post = `${id},${faker.random.word()},${faker.lorem.paragraphs(3)},
                      ${ faker.random.number({min: 1, max: 999})},${faker.random.number({min: 2, max: 5, precision: 0.01})},
                      ${faker.random.number({min: 3, max: 10})},${faker.random.number({min: 11, max: 30})}\n`
        // check if it write is unsuccessful
        if (!data.write(post)) {
            // call the drain function to clear memory
            await new Promise(resolve => data.once('drain', resolve));
        }
        // write random image info for the current listing id on /database/files/images.csv
        for (let idx = 0; idx < randPhotoNum; idx++) {
            if (!images.write(`${idx},${id},${faker.image.food()},${faker.random.word() + faker.date.past()}\n`)) {
                await new Promise(resolve => images.once('drain',resolve))
            }
        } 
        // write random tags info for the current listing id on /database/files/tags.csv
        for (let idx = 0; idx < randTagNum + 5; idx++) {
            if (!tags.write(`${idx},${id},${faker.random.word()}\n`)) {
                await new Promise(resolve => tags.once('drain',resolve))
            }
        }
        // write random types info for the current listing id on /database/files/types.csv
        for (let idx = 0; idx < randCuiNum; idx++) {
          // choose a random index from cuisine array
          const randCuisineIndex = Math.floor(Math.random() * cuisine.length);
          if (!types.write(`${idx},${id},${cuisine[randCuisineIndex]}\n`)) {
            await new Promise(resolve => types.once('drain',resolve))
          }
        }
    }
    // to know if the code execution is done and return the process time
    callback(process.uptime());
}

generateData((res) => {
    console.log('Process time is:', res)
});