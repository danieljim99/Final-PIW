import {ApolloProvider, ApolloClient, createHttpLink, InMemoryCache} from "@apollo/client";
import { setContext } from "apollo-link-context";
import React, {useState} from 'react';
import Page from './components/Page';
import './styles/App.css';

function App() {
  const [token, setToken] = useState();

  const onAuthenticate = (token) => {
    setToken(token);
  };

  const reAuth = () => {
    setToken(undefined);
  }

  if (!token)
    return (
      <div className="App">
        <input id="token" placeholder="github token" />
        <button onClick={() => onAuthenticate(document.getElementById("token").value)}>
          Authenticate
        </button>
      </div>
    );
  else {
    const httpLink = createHttpLink({
      uri: "https://api.github.com/graphql",
    });

    const authLink = setContext((_, { headers }) => {
      return {
        headers: {
          ...headers,
          authorization: token ? `Bearer ${token}` : "",
        },
      };
    });

    const client = new ApolloClient({
      link: authLink.concat(httpLink),
      cache: new InMemoryCache(),
    });

    return (
      <ApolloProvider client={client}>
        <div className="App">
          <Page reAuth={reAuth}/>
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
