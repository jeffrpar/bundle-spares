// ----------------------------------------------------------------
// Dependencies

const { gql } = require('apollo-server-express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const typeDefs = gql`

    # ---------------------------------------------------------------------------------------------------------
    # TYPES
    type User {
        _id: ID!
        username: String!
        email: String!
        savedItems: [Items]
        savedCount: Int!
        cart: [Items]
        cartCount: Int!
        ownedItems: [Items]
    }


    type Items {
        _id: ID!
        name: String!
        serialKey: String!
        img: String!
        stock: Int!
        category: Category
    }

    type Category {
        _id: ID!
        category: String!
        items: String
    }


    type Auth {
        token: ID!
        user: User
    }

    # ---------------------------------------------------------------------------------------------------------
    # QUERIES
    type Query {
        me: User
        allItems: [Items]
        findItem(itemName: String!): Items
        allCategories: [Category]
        findCategory(categoryName: String!): [Category]
        createCheckoutSession: String!
    }

    # ---------------------------------------------------------------------------------------------------------
    # MUTATIONS
    type Mutation {
        # Takes email and password and returns an Auth type Object.
        login(email: String!, password: String!): Auth
        # Takes email, password and username and returns an Auth type Object.
        addUser(username: String!, email: String!, password: String!): Auth
        # Takes all the data from the Item and returns an Updated User with the saved item. -> Saved
        saveItem(
            _id: ID!
        ): User
        # Takes all the data from the Item and returns an Updated User with the saved item. -> Cart
        addToCart(   
            _id: ID!
        ): User
        # Takes the desired item to delete ID
        removeCartItem(
            _id: ID!
        ): User
        # 
        checkoutCart(
            _id: ID!
        ): User
        # Takes the desired item to delete ID
        removeSavedItem(
            _id: ID!
        ): User
        # 
        addItem(
            name: String!
            serialKey: String!
            img: String!
            stock: Int!
            category: ID!
        ): Items

        
        # --------------------------------------------
        # FUTURE IMPLEMENTATIONS:

        # Delete User
        # 
        # 

    }

`

module.exports = typeDefs;