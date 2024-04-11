const { fileLoader, mergeResolvers } = require("merge-graphql-schemas");
const path = require("path");

jest.mock("merge-graphql-schemas", () => ({
  fileLoader: jest.fn(),
  mergeResolvers: jest.fn(),
}));

describe("GraphQL Resolvers", () => {
  it("should load and merge GraphQL resolvers", () => {
    mergeResolvers.mockReturnValue({ MergedResolvers: true });

    const { resolvers: mergedResolvers } = require("./resolvers.js");

    expect(fileLoader).toHaveBeenCalledWith(path.join(__dirname, "./resolvers"));
    expect(mergeResolvers).toHaveBeenCalledTimes(1);
    expect(mergedResolvers).toEqual({ MergedResolvers: true });
  });
});