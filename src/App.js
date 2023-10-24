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
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <div className="App ">
      <QueryClientProvider client={queryClient}>
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
              <Events />
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
      </QueryClientProvider>
    </div>
  );
}

export default App;
