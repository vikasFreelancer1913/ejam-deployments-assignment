import React from 'react';
import {BrowserRouter as Router, Route, NavLink, Switch} from 'react-router-dom';
import './App.css';
import DeploymentList from './components/deployments/DeploymentList';
import DeploymentAdd from './components/deployments/DeploymentAdd';

function App() {
  return (
    <div className="App">     
      <Router>
        <Navigation />
        <div className="container">
          <Main />
        </div>
      </Router>
    </div>
  );
}

function Navigation() {
  return(
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-4">
      <div className="container">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item"><NavLink exact className="nav-link" activeClassName="active" to="/">Deployments</NavLink></li>
        </ul>
      </div>
    </nav>
  );
}

function Main() {
  return(
    <Switch>
      <Route exact path="/" component={DeploymentList} />
      <Route exact path="/deployments/new" component={DeploymentAdd} />
    </Switch>
  );
}

export default App;