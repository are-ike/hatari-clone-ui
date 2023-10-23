import "./App.css";
import NavBar from "./components/nav-bar";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Projects from "./pages/projects";
import Workflow from "./pages/workflow";
import PageNotFound from "./pages/page-not-found";
import Config from "./pages/config";
import Events from "./pages/events";

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

          <Route exact path="/projects/:id">
            <Events/>
          </Route>
          <Route exact path="/projects/:id/events">
            <Events />
          </Route>
          <Route exact path="/projects/:id/workflow">
            <Workflow />
          </Route>
          <Route exact path="/projects/:id/configuration">
            <Config />
          </Route>

          <Route path="*">
            <PageNotFound />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
