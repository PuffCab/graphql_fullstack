//REVIEW[epic=schema, seq=1] 6-1 Import mock data
import { clients } from "../sampleData.js";
//REVIEW[epic=schema, seq=2] 7-2 Import type
import {
  GraphQLID,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} from "graphql";

//REVIEW[epic=schema, seq=3] 8-3 Create type for clients data, creating a new instance of the Imported GraphQLObjectType
// const ClientType = new GraphQLObjectType({
const ClientType = new GraphQLObjectType({
  //  we give it a name, by convention usually capitals
  name: "Client",
  //REVIEW[epic=schema, seq=4] 9-4 fields is gonna be a function with all the fields from the object, defining the type using the graphql types

  //field is a function that returns an object
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    phone: { type: GraphQLString },
  }),
});

//REVIEW[epic=schema, seq=5] 10-5 To make a query, e.g. get a client by id, we need to create our RootQuery object

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  //now fields is an object, and the properties are gonna pertain to queries. So if one is called "client", it would be to fetch a client.
  fields: {
    client: {
      type: ClientType, //if we want a single client, we'll need an Id to know which client
      args: {
        id: { type: GraphQLID },
      },
      //now, whatever we want to send when we respond, that goes inside the "resolver", which is a function
      //that takes a parent value (parten) and arguments (args)
      resolve(parent, args) {
        //the return of this function will be the data que want to send
        //here later will go our mongoose function to get a client by id from the database.
        //for now I just go to my local "database" and find the client according to the Id passed as args
        //   console.log("args :>> ", args);
        return clients.find((client) => client.id === args.id);
      },
    },
  },
});

//REVIEW[epic=schema, seq=6] 11-6 We turn RootQuery into a GraphQL Schema and export it. We use it in index.js
const firstSchema = new GraphQLSchema({ query: RootQuery });
export default firstSchema;
