import React from 'react';
import * as Material from '@material-ui/core';
import { BrowserRouter as Router, Link, Switch, Route } from 'react-router-dom';
import './App.css';
import Home from './page/Home';
import EnterContest from './page/EnterContest';
import ContestList from './page/ContestList';

function App() { 

  return (
   <Router>
    <main>
      <nav>
        <Material.Button component={Link} to="/">Home</Material.Button>
        <Material.Button component={Link} to="/contestlist">Show Contests</Material.Button>
        <Material.Button component={Link} to="/entercontest">Enter Contest</Material.Button>
      </nav>
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/entercontest" exact component={EnterContest} />
      <Route path="/contestlist" exact component={ContestList}></Route>
    </Switch>
    </main>
</Router>
  );
}

export default App;
