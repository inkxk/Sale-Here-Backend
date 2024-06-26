const { fileLoader, mergeTypes } = require("merge-graphql-schemas");
const path = require("path");

const typesArray = fileLoader(path.join(__dirname, "./schema"));
const typeDefs = mergeTypes(typesArray, { all: true });

module.exports = {
  typeDefs,
};
