import React, { useState, useEffect } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import CardForm from "./CardForm";
import { readDeck, createCard } from "../utils/api";


function AddCard() {

  const [deck, setDeck] = useState({ card: [] }); 
  const { deckId } = useParams();
  const history = useHistory();

  useEffect(() => {
    readDeck(deckId).then(setDeck);
  }, [deckId]);


  function handleDone() {
    history.push(`/decks/${deckId}`);
  }


  function handleSubmit(card) {
    createCard(deckId, card);
  }


  if (!deck) {
    return <h1>Loading data...</h1>;
  }
  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to="/">{deck.name}</Link>
          </li>
          <li aria-current="page" className="breadcrumb-item active">
            Add Card
          </li>
        </ol>
      </nav>

      {<h3>{deck.name}: Add Card</h3>}

      <CardForm onSubmit={handleSubmit} initialState={deck} onDone={handleDone}/>
    </div>
  );
}

export default AddCard;