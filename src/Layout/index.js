import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import NotFound from "./NotFound";
import Header from "./Header";
import { listDecks, createCard } from "../utils/api/index";
import Home from "./Home";
import EditCard from "./EditCard";
import EditDeck from "./EditDeck";
import CreateDeck from "./CreateDeck";
import AddCard from "./AddCard";
import SeeDeck from "./SeeDeck";
import Study from "./Study";

function Layout() {
  return (
    <>
      <Header />
      <div className="container">
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/decks/:deckId/cards/:cardId/edit">
            <EditCard />
          </Route>
          <Route path="/decks/:deckId/cards/new">
            <AddCard />
          </Route>
          <Route path="/decks/:deckId/edit">
            <EditDeck />
          </Route>
          <Route path="/decks/:deckId/study">
            <Study />
          </Route>
          <Route path="/decks/new">
            <CreateDeck />
          </Route>
          <Route path="/decks/:deckId">
            <SeeDeck />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </div> 
    </>
  );
}

export default Layout;
