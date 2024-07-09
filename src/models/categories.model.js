const fs = require('fs');
const path = require('path');

const categories = require('./categories.mongo');

async function loadCategoriesData() {
    try{
        const filePath = path.join(__dirname,'..','..','src','data','dummy.json');
        const rawData = fs.readFileSync(filePath);
        const jsonData = JSON.parse(rawData);

        const categoriesArray = jsonData.categories;

        for(const category of categoriesArray) {
            await categories.updateOne(
                {id: category.id},
                {
                    $set: {
                        id: category.id,
                        title: category.title
                    }
                },
                {upsert: true}
            );
            console.log('Saved category: ',category.title);
        }
        const count = (await getAllCategories()).length;
        console.log(`${count} categories found!`);

        }  catch(err){
            console.error('Could not save category', err);
        }
    }

async function getAllCategories() {
    return await categories.find({}, {
        '_id':0, 
        '__v':0,
    })
}

module.exports = {
    loadCategoriesData,
    getAllCategories,
}