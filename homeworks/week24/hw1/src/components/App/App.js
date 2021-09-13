import React, { useEffect } from "react";
import styled from "styled-components";
import LoginPage from "../pages/LoginPage";
import HomePage from "../pages/HomePage";
import PostPage from "../pages/PostPage";
import AddPage from "../pages/AddPage";
import AboutPage from "../pages/AboutPage";
import RegisterPage from "../pages/RegisterPage";
import Header from "../Header";
import { getMe } from "../../WebAPI.js";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/reducers/userReducer";

const Root = styled.div`
  padding-top: 64px;
`;

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    getMe().then((response) => {
      if (response.ok) {
        dispatch(setUser(response.data));
      }
    });
  }, [dispatch]);
  return (
    <Root>
      <Router>
        <Header />
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route exact path="/posts/:id">
            <PostPage />
          </Route>
          <Route path="/login">
            <LoginPage />
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
  );
}

export default App;
