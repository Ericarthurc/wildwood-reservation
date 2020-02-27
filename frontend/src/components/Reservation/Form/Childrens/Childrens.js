import React, { useState } from 'react';

const Childrens = () => {
  const [children, setChildren] = useState('');

  const childrenHandler = event => {
    let formSwitcher = event.target.value;
    if (formSwitcher === 'true' || formSwitcher === 'false') {
      formSwitcher = JSON.parse(formSwitcher);
    }
    setChildren(formSwitcher);
  };

  const childrenCounter = (
    <>
      <select className="inputs__control" defaultValue="">
        <option value="" disabled>
          How many 0 - 23 months old?
        </option>
        <option value="0">0</option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
      </select>
      <select className="inputs__control" defaultValue="">
        <option value="" disabled>
          How many 2 year olds?
        </option>
        <option value="0">0</option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
      </select>
      <select className="inputs__control" defaultValue="">
        <option value="" disabled>
          How many 3 year olds?
        </option>
        <option value="0">0</option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
      </select>
      <select className="inputs__control" defaultValue="">
        <option value="" disabled>
          How many 4 year olds?
        </option>
        <option value="0">0</option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
      </select>
      <select className="inputs__control" defaultValue="">
        <option value="" disabled>
          How many 5 year olds/Kindergarten?
        </option>
        <option value="0">0</option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
      </select>
      <select className="inputs__control" defaultValue="">
        <option value="" disabled>
          How many in 1st - 5th Grade?
        </option>
        <option value="0">0</option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
      </select>
    </>
  );

  return (
    <>
      <select
        onChange={childrenHandler}
        className="inputs__control"
        placeholder="Enter seats:"
        defaultValue={children}
      >
        <option value="" disabled>
          Are you bringing children?
        </option>
        <option value="false">No</option>
        <option value="true">Yes</option>
      </select>

      {children ? childrenCounter : null}

      <button className="inputs__button" type="submit">
        Submit
      </button>
    </>
  );
};

export default Childrens;
