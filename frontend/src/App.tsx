import "./App.css";
import Login from "./views/Login";
import Register from "./views/Register";
import PageLoading from "./components/PageLoading";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function App() {
  return (
    <Router>
      <Route exact path="/login">
        <Login />
      </Route>
      <Route exact path="/register">
        <Register />
      </Route>
    </Router>
  );
}

export default App;
