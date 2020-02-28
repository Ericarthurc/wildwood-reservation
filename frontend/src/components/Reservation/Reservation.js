import React from 'react';
import titleLogo from '../../assets/images/wwLogo.svg';
import imageLogo from '../../assets/images/easter.png';

import Form from './Form/Form';

const Reservation = () => {
  return (
    <div className="Reservation">
      <div className="header">
        <img className="header__title" src={titleLogo} alt="Title" />
        <img className="header__logo" src={imageLogo} alt="Logo" />
      </div>
      <div className="content">
        <Form></Form>
      </div>
    </div>
  );
};

export default Reservation;
