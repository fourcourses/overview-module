
const faker = require('faker');
const data = require('fs').createWriteStream('database/sample/data.csv');

const writeData = (target) => {
    const cuisine = ['Japanese', 'Korean', 'Chinese', 'French', 'German', 'American', 'Mexican',
    'Vietnamese', 'Taiwanese', 'Brazilian', 'Italian', 'Martian', 'Connecticotian',
    'Indian', 'Jamaican', 'Seafood', 'Ethiopian', 'Mediterranean', 'Californian'];
     // write headers for every csv file
    data.write('id|name|description|photos|tags|cuisine|reviews|priceStart|priceEnd\n');
    const generateData = (target, idx = 1) => {
        for ( let id = idx; id <= target; id++) {
            const randPhotoNum = Math.floor(Math.random() * 15 + 10);
            const randTagNum = Math.floor(Math.random() * 8 + 3);
            const randCuiNum = Math.floor(Math.random() * 2 + 1);
            const tags = [];
            const photos = [];
            const cuisines = [];
     
             for (let idx = 0; idx < randPhotoNum; idx++) {
                let randomNum = Math.floor(Math.random() * 25 + 1);              
                 photos.push({
                     imgUrl:  `https://s3-us-west-1.amazonaws.com/hrsf113fec/${randomNum}.jpg`,
                     caption: faker.random.word() + faker.date.past(),
                 })
             }  
             for (let idx = 0; idx < randTagNum + 5; idx++) {
                 tags.push(faker.random.word())
             }
             for (let idx = 0; idx < randCuiNum; idx++) {
               // choose a random index from cuisine array
               const randCuisineIndex = Math.floor(Math.random() * cuisine.length);
               cuisines.push(cuisine[randCuisineIndex])
             }
     
             const post = `${id}|${faker.random.word()}|${JSON.stringify(faker.lorem.sentence())}|${JSON.stringify(photos)}|${JSON.stringify(tags)}|${JSON.stringify(cuisines)}|${faker.random.number({min: 1, max: 999})}|${faker.random.number({min: 2, max: 5, precision: 0.01})}|${faker.random.number({min: 3, max: 10})}\n`
             // check if it write is unsuccessful
             if (!data.write(post)) { 
                 // call the drain function to clear memory
                 data.once('drain', () => generateData(target, id))
                 return;
             }
         }
         data.end();
    }
    generateData(target, idx = 1)
} 
writeData(100);



// const generateData = async (callback) => {
    
//     const cuisine = ['Japanese', 'Korean', 'Chinese', 'French', 'German', 'American', 'Mexican',
//                     'Vietnamese', 'Taiwanese', 'Brazilian', 'Italian', 'Martian', 'Connecticotian',
//                      'Indian', 'Jamaican', 'Seafood', 'Ethiopian', 'Mediterranean', 'Californian'];
//     // write headers for every csv file
//     data.write('id|name|description|photos|tags|cuisine|reviews|priceStart|priceEnd\n');

//     // create 10m records 
//     for(let id = 1; id <= 1e4; id++) {
//         // generate random number for photo, tags and cuisines
//        const randPhotoNum = Math.floor(Math.random() * 15 + 10);
//        const randTagNum = Math.floor(Math.random() * 8 + 3);
//        const randCuiNum = Math.floor(Math.random() * 2 + 1);
//        const tags = [];
//        const photos = [];
//        const cuisines = [];

//         for (let idx = 0; idx < randPhotoNum; idx++) {
//             photos.push({
//                 imgUrl: faker.image.food(),
//                 caption: faker.random.word() + faker.date.past(),
//             })
//         }  
//         for (let idx = 0; idx < randTagNum + 5; idx++) {
//             tags.push({
//                 tag: faker.random.word(),
//             })
//         }
//         for (let idx = 0; idx < randCuiNum; idx++) {
//           // choose a random index from cuisine array
//           const randCuisineIndex = Math.floor(Math.random() * cuisine.length);
//           cuisines.push({
//               type: cuisine[randCuisineIndex],
//           })
//         }

//         const post = `${id}|${faker.random.word()}|${JSON.stringify(faker.lorem.sentence())}|${JSON.stringify(photos)}|${JSON.stringify(tags)}|${JSON.stringify(cuisines)}|${faker.random.number({min: 1, max: 999})}|${faker.random.number({min: 2, max: 5, precision: 0.01})}|${faker.random.number({min: 3, max: 10})}\n`
//         // check if it write is unsuccessful
//         if (!data.write(post)) {
//             // call the drain function to clear memory
//             await new Promise(resolve => data.once('drain', resolve));
//         }
        
//     }
//     // to know if the code execution is done and return the process time
//     callback(process.uptime());
// }
