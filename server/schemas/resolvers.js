// ----------------------------------------------------------------
// Dependencies.

const { User, Category, Items } = require("../models/index");
const { AuthenticationError } = require("apollo-server-express");
const { signToken } = require("../utils/auth");

// ----------------------------------------------------------------
// Resolvers for the typeDefs.
const resolvers = {
    Query: {
        me: async (root, args, context) => {
            if (context.user) {
                const userData = await User.findOne({ _id: context.user._id }).select('-__v -password'
                );
                // Returns the user information and takes the password out of the object.
                return userData;
            };
            // Throws new error if you are not logged in.
            throw new AuthenticationError('You need to be logged in in order to get access!')
        },

        // Searchs for all of the items available.
        allItems: async () => { return await Items.find({}) },

        // Searchs for a specifc item.
        findItem: async (root, args) => {
            const { itemName } = await args;
            return await Items.findOne({ name: itemName })
        },

        // Searchs for all of the categories available.
        allCategories: async () => { return await Category.find({}) },

        // Searchs for a category item.
        findCategory: async (root, args) => {
            const { categoryName } = await args;
            return await Category.findOne({ category: categoryName })
        },

    },

    Mutations: {

    },



}

module.exports = resolvers;