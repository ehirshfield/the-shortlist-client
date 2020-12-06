import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache
  } from '@apollo/client';
import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Home, Author, Review, Reviews, NotFound, User } from './sections'
import reportWebVitals from './reportWebVitals';
import './styles/index.css'

const client = new ApolloClient({ uri: '/api', cache: new InMemoryCache() });

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/author" component={Author} />
        <Route exact path="/review/:id" component={Review} />
        <Route exact path="/reviews/:location?" component={Reviews} />
        <Route exact path="/user/:id" component={User} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  )
}

render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
