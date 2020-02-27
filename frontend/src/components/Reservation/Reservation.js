import React from 'react';
import logo from '../../assets/images/wwLogo.svg';

import Form from './Form/Form';

const Reservation = () => {
  return (
    <div className="Reservation">
      <div className="header">
        <img className="header__logo" src={logo} />
      </div>
      <div className="content">
        <Form></Form>
      </div>
    </div>
  );
};

export default Reservation;
