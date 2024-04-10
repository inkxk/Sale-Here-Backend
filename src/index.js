const { ApolloServer, gql } = require('apollo-server');
const { typeDefs } = require('./graphql/typedefs');
const { resolvers } = require('./graphql/resolvers');
const { connectDB } = require('./config/db');

await connectDB();  

const server = new ApolloServer({
  typeDefs: gql`
    ${typeDefs}
  `,
  resolvers
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
