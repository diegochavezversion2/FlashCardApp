import React from "react";
import { Route, Link } from "react-router-dom";


function SeeCards({ handleCard, currentDeck }) {

  if (!currentDeck.cards) {
    return null;
  }

  const { cards = [] } = currentDeck;

  return cards.map((card, index) => {
    return (
      <div key={index} className="card">
        <div className="card-body">
          <div className="row justify-content-between p-2">
            <p className="col card-text">{card.front}</p>
            <p className="col card-text">{card.back}</p>
          </div>
          <div>
            <div className="row justify-content-between p-3">
              <Link to={`/decks/${currentDeck.id}/cards/${card.id}/edit`} className="btn btn-secondary mr-2" >Edit</Link>
            <button className="btn btn-danger" onClick={() => handleCard(card.id)}
            >
              Delete
            </button>
            </div>
          </div>
        </div>
      </div>
    );
  });
}

export default SeeCards;