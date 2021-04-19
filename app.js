const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const { buildSchema } = require("graphql");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const schema = buildSchema(
  `type Query {
        hello : String
    }`
);

let root = {
  hello: () => {
    return "hello world";
  },
};

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  })
);

app.listen(8081);
