import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://www.cms.mitidindia.com/graphql",
  cache: new InMemoryCache(),
});

export default client;
