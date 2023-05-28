import React from "react";
import ShownDecks from "./ShownDecks";
import { Route, Link } from "react-router-dom";

function Home() {

  return (
    <div>
      <div className="pb-4">
        <Link className="btn btn-secondary" to={"/decks/new"} >
          Create New Deck
        </Link>
      </div>
      <div>
        <ShownDecks />
      </div>
    </div>
  );
}

export default Home;