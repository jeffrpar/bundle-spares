// -----------------------------------------------------------------------
// Dependencies
const express = require('express');
const db = require('./config/connection');
const path = require('path');

// Import ApolloServer
const { ApolloServer } = require('apollo-server-express');
const { authMiddleware } = require('./utils/auth');
const { typeDefs, resolvers } = require('./schemas/index');

// -----------------------------------------------------------------------
// APP CONFIGURATION
const app = express();
const PORT = process.env.PORT || 3001;

// APOLLO SERVER
const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: authMiddleware,
});

// -----------------------------------------------------------------------
// Middleware
app.use(express.urlencoded({ extended: true }))
app.use(express.json());


// If we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/build')));
}

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build'));
});

// -----------------------------------------------------------------------
// Start the Server.....
const startApolloServer = async (typeDefs, resolvers) => {
    await server.start();
    server.applyMiddleware({ app });

    db.once('open', () => {
        app.listen(PORT, () => {
            console.log(`API server running on port ${PORT}!`);
            console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
        });
    });
};

// DONE!
startApolloServer(typeDefs, resolvers);

