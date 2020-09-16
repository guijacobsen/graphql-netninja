const graphql = require("graphql");

const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLID,
  GraphQLList,
} = graphql;

// moked data
let books = [
  { name: "Livro 1", genre: "Genre 1", id: 1, authorId: 1 },
  { name: "Livro 2", genre: "Genre 2", id: 2, authorId: 1 },
  { name: "Livro 3", genre: "Genre 3", id: 3, authorId: 2 },
  { name: "Livro 4", genre: "Genre 4", id: 4, authorId: 2 },
  { name: "Livro 5", genre: "Genre 5", id: 5, authorId: 3 },
  { name: "Livro 6", genre: "Genre 6", id: 6, authorId: 3 },
];
let authors = [
  { name: "Author 1", age: 21, id: 1 },
  { name: "Author 2", age: 22, id: 2 },
  { name: "Author 3", age: 23, id: 3 },
];

//
const AuthorType = new GraphQLObjectType({
  name: "Author",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        console.log("-- parent : ", parent);
        return books.filter((book) => book.authorId == parent.id);
      },
    },
  }),
});

const BookType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    author: {
      type: AuthorType,
      resolve(parent, args) {
        console.log("-- parent : ", parent);
        return authors.filter((author) => author.id == parent.authorId)[0];
      },
    },
  }),
});

//
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        return books;
      },
    },
    book: {
      type: BookType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        // code to get data from db / other source
        console.log(typeof args.id);
        const book = books.filter((book) => book.id == args.id);
        return book[0] || null;
      },
    },
    authors: {
      type: GraphQLList(AuthorType),
      resolve(parent, args) {
        return authors;
      },
    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        console.log(typeof args.id);
        return authors.filter((author) => author.id == args.id)[0];
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
