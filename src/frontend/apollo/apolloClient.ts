import { ApolloClient, InMemoryCache } from "@apollo/client";
import { getAccessToken } from "../accessToken";
import { GRAPHQL_ENDPOINT } from "../ClientContants";

const cache = new InMemoryCache();

const client = new ApolloClient({
  uri: GRAPHQL_ENDPOINT,
  headers: {
    authorization: `bearer ${getAccessToken()}`,
  },
  cache,
});

export default client;
