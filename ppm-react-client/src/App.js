import React, { Component } from "react";
import "./App.css";
import Dashboard from "./components/Dashboard";
import Header from "./components/Layout/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import AddProject from "./components/Project/AddProject";
import { Provider } from "react-redux";
import store from "./strore";
import UpdateProject from "./components/Project/UpdateProject";
import DeletedProjects from "./components/DeletedProjects";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Header />
          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/deletedProjects" component={DeletedProjects} />
          <Route exact path="/addProject" component={AddProject} />
          <Route
            exact
            path="/updateProject/:projectIdentifier"
            component={UpdateProject}
          />
        </div>
      </Router>
    </Provider>
  );
}

export default App;