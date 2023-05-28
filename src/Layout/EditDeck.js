import React, { useEffect, useState } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import DeckForm from "./DeckForm";
import { updateDeck, readDeck} from "../utils/api";

function EditDeck() {
  const initialDeck = { 
    name: "", 
    description: "" 
}

  const history = useHistory();
  const { deckId } = useParams();

  const [deck, setDeck] = useState(initialDeck);

  useEffect(() => {
    readDeck(deckId).then(setDeck);
  }, [deckId]);

  function handleCancelDeck() {
    history.push(`/decks/${deck.id}`);
  }

  function handleSubmit(deck) {
    updateDeck(deck).then(handleCancelDeck);
  }

  if (!deck) {
    return <h1>Loading...</h1>;
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
          <li className="breadcrumb-item active" aria-current="page">
            Edit Deck
          </li>
        </ol>
      </nav>
      <h1>Edit Deck</h1>
      {deck.id ? (<DeckForm initialState={deck} onSubmit={handleSubmit} onDone={handleCancelDeck} />) : (<h1>Loading...</h1>)}
    </div>
  );
}

export default EditDeck;