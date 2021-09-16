import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import styled from "styled-components";
import Boards from "./Boards";
import Board from "./Board";
import Profile from "./Profile";
import NavBar from "../components/navBar/NavBar";

const WrapperStyled = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  .pages-container {
    flex: 1;
    width: 100%;
    overflow-x: none;
    overflow-y: auto;
  }
`;

function ProtectedRoutes() {
    return (
         <WrapperStyled>
      <Router>
        
        <div className="pages-container">
          <Switch>
            <Route exact path="/">
              <Boards />
            </Route>
            <Route exact path="/profile">
              <Profile />
            </Route>
            <Route exact path="/b/:id">
              <Board />
            </Route>
          </Switch>
        </div>
      </Router>
    </WrapperStyled>
  );
}

export default ProtectedRoutes;
