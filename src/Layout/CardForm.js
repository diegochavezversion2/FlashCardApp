import React, { useState } from "react";

function CardForm({onSubmit, initialState, onDone }) {
  const [card, setCard] = useState(initialState);

  function handleSubmit(e) {
    e.preventDefault();
    e.stopPropagation();
    onSubmit({ ...card });
    setCard({ front: "", back: "" });
  }


  function handleChange({ target: { name, value } }) {
    setCard((previousCardData) => ({
      ...previousCardData,
      [name]: value,
    }));
  }


  return (
    <form onSubmit={handleSubmit} className="card-form">
    
        <div className="p-4">
          <label htmlFor="front">Front </label>
          <textarea id="front" name="front" type="text" required={true} value={card.front}  className="form-control" placeholder="Front side of the card" onChange={handleChange}/>
        </div>
        <div className="p-4">
          <label htmlFor="back">Back</label>
          <textarea id="back" name="back" required={true} className="form-control" placeholder="Back side of the card" value={card.back} onChange={handleChange}/>
        </div>
        <div className="p-4">
          <button type="button" className="btn btn-secondary mr-2" onClick={onDone}>Done</button>
          <button type="submit" className="btn btn-primary">Save</button>
        </div>
    </form>
  );
}

export default CardForm;