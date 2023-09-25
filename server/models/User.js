// ----------------------------------------------------------------
// Dependencies

const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

// ----------------------------------------------------------------
// User Schema

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: [/.+@.+/, 'Must match an email address!']
        },
        password: {
            type: String,
            required: true,
            minlength: 5
        },
        savedItems: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Items'
            }
        ],
        cart: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Items'
            }
        ]
    },
    {
        toJSON: {
            virtuals: true,
        },
    }
);

// Ecrypts the password before saving the user to the database
userSchema.pre('save', async function (next) {
    try {
        if (this.isNew || this.isModified('password')) {
            const saltRounds = 10;
            const hashPass = await bcrypt.hash(this.password, saltRounds);
            this.password = hashPass;
        }
        next();

    } catch (err) {
        next(err);
    }
});

// Method for the model to validate the password when logged in.
userSchema.methods.isCorrectPassword = async function (password) {
    return bcrypt.compare(password, this.password);
};

// When we query a user, we'll also get another field called `savedItems` with the number of saved items we have.
userSchema.virtual('savedCount').get(function () {
    return this.savedItems.length;
});

// When we query a user, we'll also get another field called `userCart` with the number of items we have in the cart.
userSchema.virtual('cartCount').get(function () {
    return this.userCart.length;
});

// Creates the user model using the userSchema
const User = model('User', userSchema);

// ----------------------------------------------------------------
module.exports = User;