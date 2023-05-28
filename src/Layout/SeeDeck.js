import React, { useState, useEffect } from "react";
import { Link, useHistory, useParams, useRouteMatch } from "react-router-dom";
import SeeCards from "./SeeCards";
import { readDeck, deleteDeck, deleteCard, listDecks } from "../utils/api";

function SeeDeck() {
  const {url} = useRouteMatch()
  const { deckId } = useParams();
  const history = useHistory();
  const [deck, setDeck] = useState({ cards: [] });


  function loadDeck() {
    readDeck(deckId).then(setDeck);
  }
  useEffect(loadDeck, [deckId]);

  console.log(deck);

  const handleCard = (cardId) => {
    if(window.confirm("Delete this card? You will not be able to recover it.")) {
      deleteCard(cardId).then(loadDeck);
    }
  }

  const handleDelete = () => {
    if(window.confirm("Delete this deck? You will not be able to recover it.")) {
      deleteDeck(deck.id).then(history.push("/"));
    }
  }
  
    
    return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item" aria-current="page">
            {deck.name}
          </li>
        </ol>
      </nav>
      <h3>{deck.name}</h3>

      <p>{deck.description}</p>
      <div className="container">
        <div className="row justify-content-between">
          <div>
            <Link className="btn btn-secondary mr-3" to={`/decks/${deck.id}/edit`} >Edit</Link>
            <Link className="btn btn-primary mr-3" to={`${url}/study`}>Study</Link>
            <Link className="btn btn-success" to={`${url}/cards/new`} >Add Card</Link>
          </div>
          <button className="btn btn-danger ms-3" id={deck.id} onClick={handleDelete}>Delete</button>
        </div>
      </div>
      <div className="mt-4">
        <SeeCards handleCard={handleCard} currentDeck={deck} />
      </div>
    </div>
  );
}

export default SeeDeck;