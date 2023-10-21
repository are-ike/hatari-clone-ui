import "./App.css";
import NavBar from "./components/nav-bar";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Projects from "./pages/projects";
import Workflows from "./pages/workflows";
import PageNotFound from "./pages/page-not-found";

function App() {
  return (
    <div className="App ">
      <Router>
        <NavBar />
        <Switch>
          <Route exact path="/">
            <Redirect to="/projects" />
          </Route>
          <Route exact path="/projects">
            <Projects />
          </Route>
          <Route exact path="/workflows">
            <Workflows />
          </Route>
          <Route path="*">
            <PageNotFound/>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
