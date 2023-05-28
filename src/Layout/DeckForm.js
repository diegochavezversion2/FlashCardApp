import React, { useState } from "react";


function DeckForm({initialState, onSubmit, onDone,}) {
  
  const [formData, setFormData] = useState(initialState);

  function handleSubmit(e) {
    e.preventDefault();
    e.stopPropagation();
    onSubmit({ ...formData });
    setFormData({ name: "", description: "" });
  }


  const handleChange = ({ target: { name, value } }) => {
    setFormData((prevDeckData) => ({
      ...prevDeckData,
      [name]: value,
    }));
   
  };


  return (
    <form onSubmit={handleSubmit}>
      <div className="p-4">
        <label htmlFor="Name"> Deck Name</label>
        <input
          type="text"
          className="form-control"
          id="Name"
          name="name"
          aria-describedby="nameHelp"
          onChange={handleChange}
          value={formData.name}
        />
      </div>
      <div className="p-4">
        <label htmlFor="Description">Deck Description</label>
        <textarea
          name="description"
          id="desription"
          rows="3"
          type="text"
          className="form-control"
          onChange={handleChange}
          value={formData.description}
        />
      </div>
      <div className="p-4">
        <button type="submit" className="btn btn-primary mr-2">Submit</button>
        <button className="btn btn-danger" onClick={onDone}>Cancel</button>
      </div>
    </form>
  );
}

export default DeckForm;