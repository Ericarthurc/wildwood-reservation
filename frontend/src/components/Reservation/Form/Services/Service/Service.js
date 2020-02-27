import React from 'react';

const Service = props => {
  return (
    <div className="selector__service">
      <label>
        <div
          className={
            props.seats <= 0
              ? 'selector__service-Disabled'
              : props.checked === props._id
              ? 'selector__service-Active'
              : 'selector__service-Inactive'
          }
        >
          <p className="selector__service-name">{props.name}</p>
          <span className="icon-DONUT"></span>
          <p className="selector__service-seats">{props.seats}</p>
          {/* <p>{props._id}</p> */}
          <input
            type="radio"
            value={props.ids}
            name={props.name}
            checked={props.checked === props._id}
            className="selector__service-Radio"
            onChange={() => props.serviceHandler(props._id)}
            disabled={props.seats <= 0}
          />
        </div>
      </label>
    </div>
  );
};

export default Service;
