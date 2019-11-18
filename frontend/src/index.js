import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import * as serviceWorker from './serviceWorker';
import ApolloClient from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
// import { persistCache } from 'apollo-cache-persist';
// import { createHttpLink } from "apollo-link-http";
// import { ApolloLink } from "apollo-link";
import { ApolloProvider } from "react-apollo";
import { onError } from "apollo-link-error";
import { HashRouter } from "react-router-dom";
import { setContext } from 'apollo-link-context'; //add apollo-link-client to client's package.json
import { createUploadLink } from 'apollo-upload-client'


import Mutations from "./graphql/mutations";
const { VERIFY_USER } = Mutations;

let uri;
if (process.env.NODE_ENV === "production") {
  uri = `/graphql`;
} else {
  uri = "http://localhost:5000/graphql";
}

const authLink = setContext((_, { headers }) => { //include setContext to create header with updated token
  const token = localStorage.getItem('auth-token');
  return {
    headers: {
      ...headers,
      authorization: token ? token : ''
    }
  };
});

const httpLink = createUploadLink({
  uri,
  headers: {
    authorization: localStorage.getItem("auth-token") || ""
  }
});

const errorLink = onError(({ graphQLErrors }) => {
  if (graphQLErrors) graphQLErrors.map(({ message }) => console.log(message));
});

const cache = new InMemoryCache({
  dataIdFromObject: object => object._id || null
});

// persistCache({
//   cache,
//   storage: localStorage
// });

const client = new ApolloClient({
  link: authLink.concat(httpLink, errorLink),
  cache,
  connectToDevTools: true,
  resolvers: {},
  onError: ({ networkError, graphQLErrors }) => {
    console.log("graphQLErrors", graphQLErrors);
    console.log("networkError", networkError);
  }
});

const token = localStorage.getItem("auth-token");

cache.writeData({
  data: {
    isLoggedIn: Boolean(token),
    currentUser: null
  }
});

if (token) {
  client
    .mutate({ mutation: VERIFY_USER, variables: { token } })
    .then(({ data }) => {
      cache.writeData({
        data: {
          isLoggedIn: data.verifyUser.loggedIn,
          currentUser: data.verifyUser._id
        }
      });
    });
} else {
  cache.writeData({
    data: {
      isLoggedIn: false,
      currentUser: null
    }
  });
}

const Root = () => {
  return (
    <ApolloProvider client={client}>
      <HashRouter>
        <App />
      </HashRouter>
    </ApolloProvider>
  );
};

ReactDOM.render(<Root />, document.getElementById("root"));

serviceWorker.unregister();