import React, { useEffect, useState } from "react";
import { readCard, readDeck, updateCard } from "../utils/api";
import { useParams, Link, useHistory } from "react-router-dom";
import CardForm from "./CardForm";


function EditCard() {
  const initialCard = { 
    front: "", 
    back: "" 
}

const { deckId, cardId } = useParams();
const [deck, setDeck] = useState({ card: [] });
const [card, setCard] = useState(initialCard);
const history = useHistory();

  useEffect(() => {
    readDeck(deckId).then(setDeck);
    readCard(cardId).then(setCard);
  }, [deckId, cardId]);

  function handleSubmit(card) {
    updateCard(card).then(handleDone);
  }

  function handleDone() {
    history.push(`/decks/${deck.id}`);
  }


  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to={`/decks/${deckId}`}>
              Deck
              {deck.name}
            </Link>
          </li>
          <li aria-current="page" className="breadcrumb-item active">
            Edit Card {cardId}
          </li>
        </ol>
      </nav>
      <h1>Edit Card</h1>
      {card.id ? <CardForm doneButtonLabel="Cancel" onSubmit={handleSubmit} initialState={card} onDone={handleDone} /> : <h1>Loading...</h1>}
    </div>
  );
}
export default EditCard;