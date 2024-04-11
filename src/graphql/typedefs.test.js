const { fileLoader, mergeTypes } = require("merge-graphql-schemas");
const path = require("path");

jest.mock("merge-graphql-schemas", () => ({
  fileLoader: jest.fn(),
  mergeTypes: jest.fn(),
}));

describe("GraphQL Schema", () => {
  it("should load and merge GraphQL type definitions", () => {
    const mockFilePaths = ["path/to/schema1.graphql", "path/to/schema2.graphql"];

    fileLoader.mockReturnValue(mockFilePaths);

    mergeTypes.mockReturnValue("MergedGraphQLTypes");

    const { typeDefs: mergedTypeDefs } = require("./typedefs");

    expect(fileLoader).toHaveBeenCalledWith(path.join(__dirname, "./schema"));
    expect(mergeTypes).toHaveBeenCalledWith(mockFilePaths, { all: true });
    expect(mergedTypeDefs).toEqual("MergedGraphQLTypes");
  });
});