import React, { useState, useEffect } from "react";
import { useHistory, Link, Route } from "react-router-dom";
import { deleteDeck, listDecks, createCard } from "../utils/api";

function ShownDecks() {
  const [decks, setDecks] = useState([]);
  const history = useHistory();

  useEffect(loadDecks, []);

  function loadDecks() {
    listDecks().then((data) => setDecks(data))
  }
  function handleDelete(deckId) {
    if(window.confirm("Delete this deck? You will not be able to recover it.")) {
      deleteDeck(deckId)
      .then(loadDecks)
      .then(history.push("/"));
    }
  }


  const decklist = decks.map((deck, index) => {
    return (
      <div className="card pb-2" key={index}>
        <div className="card-body">
          <div className="justify-content-between px-4 row">
            <h5 className="card-title pb-2">{deck.name}</h5>
            <p>{deck.cards.length} cards</p>
          </div>
          <p className="row card-text px-4">{deck.description}</p>
          <div className="row px-4">       
              <Link className="btn btn-secondary mr-3" to={`/decks/${deck.id}`} >View</Link>
              <Link className="btn btn-primary mr-3" to={`/decks/${deck.id}/study`} >Study</Link>
              <button className="btn btn-danger" onClick={() => handleDelete(deck.id)} >Delete</button>          
          </div>
        </div>
      </div>
    );
  });

  return decklist;
}

export default ShownDecks;