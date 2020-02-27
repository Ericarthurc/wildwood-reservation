import React from 'react';

const Inputs = () => {
  return (
    <>
      <input
        className="inputs__control"
        type="number"
        min="1"
        max="10"
        name="seatsInput"
        placeholder="Seats (1-10):"
      />
      <input
        className="inputs__control"
        type="name"
        name="nameInput"
        placeholder="Name:"
      />
      <input
        className="inputs__control"
        type="email"
        name="emailInput"
        placeholder="Email:"
      />
    </>
  );
};

export default Inputs;
