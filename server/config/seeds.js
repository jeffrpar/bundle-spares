const db = require('./connection');


const categoriesData = require('./seeds/categoriesData.json');
const itemsData = require('./seeds/itemsData.json');

db.once('open', async () => {

    const { User, Category, Items } = require("../models/index");

    await Category.deleteMany({});
    await Items.deleteMany({});

    const categories = await Category.insertMany(categoriesData);
    const items = await Items.insertMany(itemsData);

    console.log('Items and Categories Seeded!');
    process.exit(0);
});
