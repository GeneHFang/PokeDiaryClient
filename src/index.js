import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux';
import store from './redux/store/store';

//Apollo/GraphQL
// import ApolloClient from 'apollo-boost';
// import {ApolloProvider} from 'react-apollo';
import {ApolloClient, InMemoryCache, ApolloProvider, useQuery} from '@apollo/client';


//Apollo setup
const client = new ApolloClient({
    uri: 'http://localhost:4000/graphql',
    cache: new InMemoryCache(),
    introspection: true
  })



ReactDOM.render(<ApolloProvider client={client}><App /></ApolloProvider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
