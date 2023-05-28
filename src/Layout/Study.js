import React, { useState, useEffect } from "react";
import { readDeck } from "../utils/api";
import { Link, useHistory, useParams } from "react-router-dom";


function Study() {
  const [counter, setCounter] = useState(0);
  const [deck, setDeck] = useState(null);
  const [nextCard, setNextCard] = useState(false);
  const [flipped, setFlipped] = useState(false);
  const history = useHistory();
  const { deckId } = useParams();


  useEffect(() => {
    const abortController = new AbortController();
    async function loadDecks() {
      try {
        const response = await readDeck(deckId, abortController.signal);
        setDeck(response);
      } catch (error) {
      }
    }
    loadDecks();
    return () => abortController.abort();
  }, [deckId]);

  
  const handleNext = () => {
    if (counter === deck.cards.length - 1) {
      if (window.confirm(`Restart cards? Click 'cancel' to return to the home page.`)) {
        setFlipped(false);
        setNextCard(false);
        setCounter(0);
      } else {
        history.push("/");
      }
    } else {
      setFlipped(false);
      setNextCard(false);
      setCounter(counter + 1);
    }
  };


  const handleFlip = () => {
    setFlipped(!flipped);
    setNextCard(true);
  };
  
  
  console.log(deck);
  
  if (!deck) {
    return <p>Loading Deck To Study....</p>;
  } else if (deck.cards.length <= 2) {
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
            <li className="breadcrumb-item active" aria-current="page">Study</li>
          </ol>
        </nav>

        <h1>{deck.name} Study</h1>
        <h3>Not enough cards.</h3>
        <h4>
          You need at least 3 cards to study. There are {deck.cards.length} cards in this deck.
        </h4>
        <Link to={`/decks/${deck.id}/cards/new`} className="btn btn-primary">Add Cards</Link>
      </div>
    );
  } else {
    const card = deck.cards[counter];
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
            <li className="breadcrumb-item active" aria-current="page">Study</li>
          </ol>
        </nav>
        <div>
          <h1>{deck.name}: Study</h1>
        </div>
        <div className="card">
          <div className="card-body">
            <h4 className="card-title">Card {counter + 1} of {deck.cards.length}</h4>
            {flipped && <p className="row card-text p-3">{card.back}</p>}
            {!flipped && <p className="row card-text p-3">{card.front}</p>}
            <button className="btn btn-secondary" onClick={handleFlip}>Flip</button>
            {nextCard && (<button className="btn btn-primary " onClick={handleNext}>Next</button>)}
          </div>
        </div>
      </div>
    );
  }
}

export default Study;