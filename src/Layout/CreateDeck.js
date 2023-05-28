import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { createDeck } from "../utils/api";


function CreateDeck() {
    const initialDeckData = {
      name: "",
      description: "",
    };

    const [deckData, setDeckData] = useState({ ...initialDeckData });
    const history = useHistory();
    
    const handleSubmit = (e) => {
        e.preventDefault();
        createDeck(deckData)
            .then((createDeck) => {
                history.push(`/decks/${createDeck.id}`);
            })
            .catch((err) => console.log(err));
    };

    const handleChange = (e) => {
        setDeckData({ ...deckData, [e.target.name]: e.target.value });
    };

  return (
    <div>
      <div>
        <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
            <li className="breadcrumb-item">
                <Link to="/">Home</Link>
            </li>
            <li className="breadcrumb-item active">
                Create New Deck
            </li>
            </ol>
        </nav>
      </div>
      <div>
        <h1>Create Deck</h1>
      </div>
      <div>
        <form onSubmit={handleSubmit}>
            <div className="p-4">
            <label htmlFor="name"> Deck Name</label>
            <input type="text" name="name" className="form-control" id="name" placeholder="Enter Deck Name" onChange={handleChange} value={deckData.name} />
            </div>
            <div className="p-4">
            <label htmlFor="description">Deck Description</label>
            <textarea type="text" name="description" className="form-control" id="desription" placeholder="Enter Deck Desription" rows="3" onChange={handleChange} value={deckData.description} />
            </div>
            <div className="justify-content-between row">
            <div className="p-4">
                <button type="submit" className="btn btn-primary">
                Submit
                </button>
            </div>
              <div className="p-4">
                <Link to={"/"}>
                    <button href="/" className="btn btn-danger">
                    Cancel
                    </button>
                </Link>
              </div>
            </div>
        </form>
      </div>
    </div>
  );
}

export default CreateDeck;