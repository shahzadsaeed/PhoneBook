import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./screens/Home";
import CreateContact from "./screens/CreateContact";
import './App.css';

export default function App() {
  return (
    <Router>
      <div className="full-height">
        <Switch>
          <Route path="/CreateContact">
            <CreateContact />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
