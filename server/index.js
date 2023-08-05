//REVIEW[epic=server setup, seq=1] 1-create index.js, instanciate express

import express from "express";
import * as dotenv from "dotenv";
dotenv.config();

import { graphqlHTTP } from "express-graphql";
import firstSchema from "./schema/mySchema.js";

const app = express();
// console.log('process.env.NODE_ENVantes :>> ', process.env.NODE_ENV);

//REVIEW[epic=server setup, seq=2] 2-create .env file for port and development mode

const port = process.env.PORT || 5003;

//REVIEW[epic=server setup, seq=4] 4-Tell to our express app to use an /graphql endpoint, using the method graphqlHTTP to use the schema and graphiql (only in dev mode)
app.use(
  "/graphql",
  graphqlHTTP({
    schema: firstSchema,
    graphiql: process.env.NODE_ENV === "development",
  })
);
console.log("test");
//REVIEW[epic=schema, seq=7] 12-7 Now that we imported our schema , we can make requests to the graphql endppont with graphiql

//REVIEW[epic=server setup, seq=3] 3-listen to the specified port, and create scripts to start server
app.listen(port, console.log(`server running on port ${port}`));
