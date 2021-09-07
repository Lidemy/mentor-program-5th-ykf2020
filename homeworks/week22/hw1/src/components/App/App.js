import React, { useState, useEffect } from "react";
import styled from "styled-components";
import LoginPage from "../pages/LoginPage";
import HomePage from "../pages/HomePage";
import PostPage from "../pages/PostPage";
import AddPage from "../pages/AddPage";
import AboutPage from "../pages/AboutPage";
import RegisterPage from "../pages/RegisterPage";
import Header from "../Header";
import { AuthContext } from "../../contexts.js";
import { getMe } from "../../WebAPI.js";
import { HashRouter as Router, Switch, Route } from "react-router-dom";

const Root = styled.div`
  padding-top: 64px;
`;

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    getMe().then((response) => {
      if (response.ok) {
        setUser(response.data);
      }
    });
  }, []);
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <Root>
        <Router>
          <Header />
          <Switch>
            <Route exact path="/">
              <HomePage />
            </Route>
            <Route path="/login">
              <LoginPage />
            </Route>
            <Route path="/posts/:id">
              <PostPage />
            </Route>
            <Route path="/new-post">
              <AddPage />
            </Route>
            <Route path="/about">
              <AboutPage />
            </Route>
            <Route path="/register">
              <RegisterPage />
            </Route>
          </Switch>
        </Router>
      </Root>
    </AuthContext.Provider>
  );
}

export default App;
