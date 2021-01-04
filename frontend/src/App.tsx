import "./App.css";
import Login from "./views/Login";
import Register from "./views/Register";
import Dashboard from "./views/Dashboard";
import Organization from "./views/Organization";
import Project from "./views/Project";
// import PageLoading from "./components/PageLoading";
import { BrowserRouter as Router, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Route exact path="/">
        <Login />
      </Route>
      <Route exact path="/register">
        <Register />
      </Route>
      <Route exact path="/dashboard">
        <Dashboard />
      </Route>
      <Route exact path="/dashboard/:organizationId">
        <Organization />
      </Route>
      <Route exact path="/dashboard/:organizationId/:projectId">
        <Project />
      </Route>
    </Router>
  );
}

export default App;
