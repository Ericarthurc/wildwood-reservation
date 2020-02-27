import React from 'react';
import titleLogo from '../../assets/images/wwLogo.svg';
import imageLogo from '../../assets/images/easter.svg';

import Form from './Form/Form';

const Reservation = () => {
  return (
    <div className="Reservation">
      <div className="header">
        <img className="header__logo" src={imageLogo} />
      </div>
      <div className="content">
        <Form></Form>
      </div>
    </div>
  );
};

export default Reservation;
