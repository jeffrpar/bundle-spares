// ----------------------------------------------------------------
// Dependencies

const { Schema, model } = require('mongoose');

// ----------------------------------------------------------------
// Items Schema

const itemsSchema = new Schema(

    {
        name: {
            type: String,
            required: true
        },
        serialKey: {
            type: String,
            required: true
        },
        img: {
            type: String,
            required: true,
            default: 'https://via.placeholder.com/150'
        },
        stock: {
            type: String,
            required: true
        },
        category: {
            type: Schema.Types.ObjectId,
            ref: 'Category'
        },
    }
);


// Creates the user Items using the userSchema
const Items = model('Items', itemsSchema);

// ----------------------------------------------------------------
module.exports = Items;