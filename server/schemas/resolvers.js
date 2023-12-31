// ----------------------------------------------------------------
// Dependencies.

const { User, Category, Items } = require("../models/index");
const { AuthenticationError } = require("apollo-server-express");
const { signToken } = require("../utils/auth");
const stripe = require('stripe')('sk_test_51NxF9XDzafWQXXJOneCDjxe3LbyTxVVzfQIPjSLCyoHd17wql7e6xamqIG7rFXs2v7SM5rg7rkdKF74dafzNx4Kx001Q4hAe4e');
const PORT = process.env.PORT || 3001;

// ----------------------------------------------------------------
// Resolvers for the typeDefs.
const resolvers = {
    Query: {
        me: async (root, args, context) => {
            if (context.user) {
                const userData = await User.findOne({ _id: context.user._id }).select('-__v -password'
                ).populate('savedItems cart ownedItems')
                    .populate({ path: 'cart', populate: { path: 'category' } })
                    .populate({ path: 'savedItems', populate: { path: 'category' } })
                    .populate({ path: 'ownedItems', populate: { path: 'category' } })
                    .populate({ path: 'ownedItems', populate: { path: 'category' } });
                // Returns the user information and takes the password out of the object.
                return userData;
            };
            // Throws new error if you are not logged in.
            throw new AuthenticationError('You need to be logged in in order to get access!')
        },

        // Searchs for all of the items available.
        allItems: async (root, args) => {
            return await Items.find({}).populate('category')
                .populate({ path: 'category', populate: { path: 'items' } })
        },

        // Searchs for a specifc item.
        findItem: async (root, args) => {
            const { itemName } = await args;
            return await Items.findOne({ name: itemName })
        },

        // Searchs for all of the categories available.
        allCategories: async () => { const categoryData = await Category.find({}); return categoryData },

        // Searchs for a category item.
        findCategory: async (root, args) => {
            const { categoryName } = await args;
            return await Category.findOne({ category: categoryName })
        },

        // Creates a checkout session.
        createCheckoutSession: async () => {
            const session = await stripe.checkout.sessions.create({
                // Takes the price id from the stripe dashboard.
                line_items: [
                    {
                        price: 'price_1NxFG7DzafWQXXJOdMAZNsAF',
                        quantity: 1,
                    }
                ],
                // Takes the success and cancel urls from the client.
                mode: 'payment',
                success_url: `http://bundlespares.com/`,
                cancel_url: `http://bundlespares.com/`,
            })

            // Returns the session.
            return JSON.stringify({ url: session.url });
        }

    },

    Mutation: {
        addUser: async (root, args) => {
            // Creates a User with the provided args.
            const user = await User.create(args);
            const token = signToken(user);
            // Returns the token and the user.
            return { token, user };
        },

        login: async (root, { email, password }) => {
            // Finds the user with the provided email.
            const user = await User.findOne({ email });

            // Checks if user exists and throws an auth error.
            if (!user) { throw new AuthenticationError("Incorrect credentials"); }

            // Checks if pw is correct and throws an auth error.
            const correctPW = await user.isCorrectPassword(password);
            if (!correctPW) { throw new AuthenticationError("Incorrect credentials"); }

            // Signs and returns the token and the user.
            const token = signToken(user);
            return { token, user }
        },

        saveItem: async (root, args, context) => {
            if (context.user) {
                // Adds a new item with the provided args in the user's savedItems array.
                const updatedUser = await User.findByIdAndUpdate(
                    { _id: context.user._id },
                    { $addToSet: { savedItems: args } },
                    { new: true, runValidators: true }
                ).populate('savedItems');

                // Returns the updated user.
                return updatedUser;
            }

            // Throws an auth error if the user is not logged in.
            throw new AuthenticationError("You need to be logged in");
        },

        addToCart: async (root, args, context) => {
            if (context.user) {
                // Adds a new item with the provided args in the user's savedItems array.
                const updatedUser = await User.findByIdAndUpdate(
                    { _id: context.user._id },
                    { $addToSet: { cart: args } },
                    { new: true, runValidators: true }
                ).populate('cart');

                // Returns the updated user.
                return updatedUser;
            }

            // Throws an auth error if the user is not logged in.
            throw new AuthenticationError("You need to be logged in");
        },

        removeCartItem: async (root, { _id }, context) => {
            if (context.user) {
                // Deletes an item with the provided args in the user's cart array.
                const updatedUser = await User.findByIdAndUpdate(
                    { _id: context.user._id },
                    { $pull: { cart: _id } },
                    { new: true, runValidators: true }
                ).populate('cart')

                // Returns the updated user.
                return updatedUser;
            }

            // Throws an auth error if the user is not logged in.
            throw new AuthenticationError("You need to be logged in");
        },

        removeSavedItem: async (root, { _id }, context) => {
            if (context.user) {
                // Deletes an item with the provided args in the user's savedItems array.
                const updatedUser = await User.findByIdAndUpdate(
                    { _id: context.user._id },
                    { $pull: { savedItems: _id } },
                    { new: true, runValidators: true }
                ).populate('savedItems')

                return updatedUser;
            }

            // Throws an auth error if the user is not logged in.
            throw new AuthenticationError("You need to be logged in");
        },

        addItem: async (root, args, context) => {
            if (context.user) {

                // Checks if the item already exists.
                const itemExists = await Items.findOne({ name: args.name });

                if (!itemExists) {
                    // Adds a new item with the provided args.
                    const updatedItem = (await Items.create(args)).populate('category');

                    // Returns the updated user.
                    return updatedItem;
                }

                return null;

            }

            // Throws an auth error if the user is not logged in.
            throw new AuthenticationError("You need to be logged in");
        },

        checkoutCart: async (root, { _id }, context) => {
            if (context.user) {

                // Update the user's cart items to be owned items and clear the cart after checkout
                const updatedUser = await User.findByIdAndUpdate(
                    { _id: context.user._id },
                    { $addToSet: { ownedItems: _id } },
                    { new: true, runValidators: true }
                ).populate('ownedItems category')


                return updatedUser;
            }

            // Throws an auth error if the user is not logged in.
            throw new AuthenticationError("You need to be logged in");
        },
    },
}

module.exports = resolvers;