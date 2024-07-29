import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client/core'
import { createApolloProvider } from '@vue/apollo-option'
import { DefaultApolloClient } from '@vue/apollo-composable'

// GrapahQL API
const authToken = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJvcGVuSnd0MiIsIm5hbWUiOiJPcGVuSldUWzJdIn0.ZV0H5kJrzOsfk3guI9pHt1bp0xzuCEFiuS4bP1XbEZE`
const graphQlUri = 'https://0kadddxyh3.execute-api.us-east-1.amazonaws.com/graphql'

// Create HttpLink
const httpLink = new HttpLink({
    // You should use an absolute URL here
    uri: graphQlUri,
    headers: {
        Authorization: "Bearer " + authToken,
    },
})

// Create the apollo client
const apolloClient = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
    connectToDevTools: true,
})

// Create a provider
const apolloProvider = createApolloProvider({
  defaultClient: apolloClient,
})

export {
  apolloClient,
  apolloProvider,
  DefaultApolloClient
}