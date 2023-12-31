import "./App.css";
import NavBar from "./components/nav-bar";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Projects from "./pages/projects";
import PageNotFound from "./pages/page-not-found";
import Project from "./pages/project";
import { QueryClient, QueryClientProvider } from "react-query";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BlockView from "./components/block-view";

export const queryClient = new QueryClient();

function App() {
  return (
    <div className="App ">
      <BlockView className="lg:hidden" />
      <div className="hidden lg:block">
        <ToastContainer
          autoClose={3000}
          position="top-center"
          hideProgressBar={true}
          icon={false}
        />
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
              <Route exact path="/projects/:id/:tab">
                <Project />
              </Route>
              <Route exact path="/projects/:id">
                <Project />
              </Route>
              <Route path="*">
                <PageNotFound />
              </Route>
              <Route path="/404">
                <PageNotFound />
              </Route>
            </Switch>
          </Router>
        </QueryClientProvider>
      </div>
    </div>
  );
}

export default App;
