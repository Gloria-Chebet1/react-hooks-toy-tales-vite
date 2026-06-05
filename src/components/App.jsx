import React, { useState, useEffect } from "react";

import Header from "./Header";
import ToyForm from "./ToyForm";
import ToyContainer from "./ToyContainer";

function App() {
  const [showForm, setShowForm] = useState(false);
  const [toys, setToys] = useState([]);

  // GET all toys
  useEffect(() => {
    fetch("http://localhost:3001/toys")
      .then((res) => res.json())
      .then((data) => setToys(data));
  }, []);

  function handleClick() {
    setShowForm((prev) => !prev);
  }

  // ADD toy
  function handleAddToy(newToy) {
    setToys((prev) => [...prev, newToy]);
  }

  // DELETE toy
  function handleDeleteToy(id) {
    setToys((prev) => prev.filter((toy) => toy.id !== id));
  }

  // UPDATE toy (LIKE)
  function handleUpdateToy(updatedToy) {
    setToys((prev) =>
      prev.map((toy) =>
        toy.id === updatedToy.id ? updatedToy : toy
      )
    );
  }

  return (
    <>
      <Header />

      {showForm ? <ToyForm onAddToy={handleAddToy} /> : null}

      <div className="buttonContainer">
        <button onClick={handleClick}>Add a Toy</button>
      </div>

      <ToyContainer
        toys={toys}
        onDeleteToy={handleDeleteToy}
        onUpdateToy={handleUpdateToy}
      />
    </>
  );
}

export default App;