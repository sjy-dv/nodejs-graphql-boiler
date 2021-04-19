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

const schema2 = buildSchema(
  `
    type Query {
        user(idx : Int!) : User
        users(name : String) : [User]
    },
    type User {
        idx : Int
        name : String
        job : String
        age : Int
        desc : String
    }`
);

const UserData = [
  {
    idx: 1,
    name: "user1",
    job: "개발자",
    age: 24,
    desc: "he is backend developer",
  },
  {
    idx: 2,
    name: "user2",
    job: "마케터",
    age: 24,
    desc: "he is marketing master",
  },
  {
    idx: 3,
    name: "user3",
    job: "요리사",
    age: 24,
    desc: "he is cooker",
  },
];

const getUser = (data) => {
  let idx = data.idx;
  return UserData.filter((user) => {
    return user.idx == idx;
  })[0];
};

const getUsers = (data) => {
  if (data.name) {
    let name = data.name;
    return UserData.filter((user) => user.name == name);
  } else {
    return UserData;
  }
};

const root2 = {
  user: getUser,
  users: getUsers,
};

app.use(
  "/graphql2",
  graphqlHTTP({
    schema: schema2,
    rootValue: root2,
    graphiql: true,
  })
);

app.listen(8081);
