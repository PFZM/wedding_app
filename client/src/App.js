import React, { useEffect } from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { Layout } from "./components/Layout";
import LandingPage from "./pages/LandingPage";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Rsvp from "./pages/Rsvp";
import GuestDashBoard from "./pages/GuestDarshBoard";

const httpLink = createHttpLink({
  uri: "/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  useEffect(() => {
    document.title = "Lana & Pablo Wedding";
  }, []);

  return (
    <ApolloProvider client={client}>
      <Router>
        <>
          <Switch>
            <Route exact path="/" component={LandingPage} />
            <Route
              exact
              path="/home"
              component={() => (
                <Layout>
                  <Home />
                </Layout>
              )}
            />
            <Route
              exact
              path="/rsvp/user/:ID"
              component={() => (
                <Layout>
                  <Rsvp />
                </Layout>
              )}
            />
            <Route
              exact
              path="/guests"
              component={() => (
                <Layout>
                  <GuestDashBoard />
                </Layout>
              )}
            />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/forgotpassword" component={ForgotPassword} />
            <Route
              exact
              path="/forgotpassword/user/:ID"
              component={ResetPassword}
            />
          </Switch>
        </>
      </Router>
    </ApolloProvider>
  );
}

export default App;
