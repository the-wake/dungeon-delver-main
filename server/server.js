const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const { ApolloServerPluginDrainHttpServer, ApolloServerPluginLandingPageGraphQLPlayground, ApolloServerPluginLandingPageDisabled } = require('apollo-server-core');
const { typeDefs, resolvers } = require('./schemas');
const { authMiddleware } = require('./utils/auth.js');
const http = require('http');
const db = require('./config/connection.js');
const path = require('path');

const PORT = process.env.PORT || 3001;

const app = express();

app.get(express.urlencoded({ extended: false }));
app.get(express.json());

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

// The wildcard route has been throwing some errors, so it's disabled for now.
// app.get('*');

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

async function startApolloServer() {
  const httpServer = http.createServer(app);
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: authMiddleware,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer }),
      // Uncomment these lines if you want to return to the GraphQL playground instead of the sandbox.
      // process.env.NODE_ENV === 'production'
      // ? ApolloServerPluginLandingPageDisabled()
      // : ApolloServerPluginLandingPageGraphQLPlayground(),
    ],
  });

  await server.start();

  // Additional middleware can be mounted at this point to run before Apollo.

  // Mount Apollo middleware here.
  server.applyMiddleware({ app, path: '/graphql' });

  db.once('open', () => {
    console.log('Mongoose DB connection established.')
  });

  await new Promise(resolve => httpServer.listen({ port: PORT }, resolve));
  console.log(`🚀 Server ready at http://localhost:3001${server.graphqlPath}`);
  return { server, app };
}

startApolloServer();

// server.applyMiddleware({ app });

