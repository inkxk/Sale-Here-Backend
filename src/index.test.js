const { ApolloServer, gql } = require("apollo-server");
const { connectDB } = require("./config/db");
const { resolvers } = require("./graphql/resolvers");

console.log = jest.fn();

jest.mock("apollo-server", () => ({
  ApolloServer: jest.fn().mockReturnValue({
    listen: jest.fn().mockResolvedValue({ url: "http://localhost:4000" })
  }),
  gql: jest.fn()
}));

jest.mock("./config/db", () => ({
  connectDB: jest.fn()
}));

describe("Apollo Server initialization", () => {
  it("should initialize ApolloServer with typeDefs and resolvers", async () => {
    require("./index");

    expect(ApolloServer).toHaveBeenCalledWith({
      typeDefs: gql(),
      resolvers
    });

    expect(connectDB).toHaveBeenCalled();
    
    expect(ApolloServer().listen).toHaveBeenCalled();

    await new Promise(resolve => setTimeout(resolve, 100));

    expect(console.log).toHaveBeenCalledWith("🚀  Server ready at http://localhost:4000");
  });
});