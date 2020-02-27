import React, { useState, useEffect } from 'react';
import axios from 'axios';
import socketIOClient from 'socket.io-client';

import Services from './Services/Services';
import Inputs from './Inputs/Inputs';
import Childrens from './Childrens/Childrens';

const Form = props => {
  const [database, setDatabase] = useState([]);
  const [selectedService, setSelectedService] = useState('');

  const [statusMessage, setStatusMessage] = useState('');
  const [statusClass, setStatusClass] = useState('form__error');

  useEffect(() => {
    getDatabase();
    const socket = socketIOClient();
    socket.on('userUpdate', () => {
      getDatabase();
    });
  }, []);

  const getDatabase = async () => {
    try {
      const services = await axios.get('/api/v2/services');
      setDatabase(services.data.data);
    } catch (e) {
      console.log(e);
    }
  };

  const serviceHandler = _id => {
    setSelectedService(_id);
  };

  const formHandler = async event => {
    event.preventDefault();

    const ss = database.find(s => {
      return s._id === selectedService;
    });

    // Loops through the bottom portion of the event values and assigns them to a new array
    let form = [];
    for (let i = database.length; i < event.target.elements.length - 1; i++) {
      form.push(event.target.elements[i].value);
    }

    try {
      await axios.post('/api/v2/users', {
        serviceName: ss.name,
        serviceId: ss._id,
        seats: form[0],
        name: form[1],
        email: form[2],
        children: form[3],
        nursery: form[4],
        twoYears: form[5],
        threeYears: form[6],
        fourYears: form[7],
        kindergarten: form[8],
        wildLife: form[9]
      });

      setStatusClass('form__pass');
      setStatusMessage('Successfully Submitted!');
    } catch (error) {
      setStatusClass('form__error');
      try {
        switch (error.response.status) {
          case 500:
            setStatusMessage('There was a server error, please refresh!');
            break;
          case 409:
            setStatusMessage('This email is already in use!');
            break;
          case 406:
            setStatusMessage('Your missing a form input!');
            break;
          case 404:
            setStatusMessage('Your missing some form inputs!');
            break;
          default:
            setStatusMessage('Your missing some form inputs!');
            break;
        }
      } catch (error) {
        setStatusClass('form__error');
        setStatusMessage("You didn't select a service!");
      }
    }
  };

  return (
    <>
      <form className="content__form" onSubmit={formHandler}>
        <div className="form__selector">
          <Services
            services={database}
            checked={selectedService}
            serviceHandler={serviceHandler}
          />
        </div>
        <p className={statusClass}>{statusMessage}</p>
        <div className="form__inputs">
          <Inputs></Inputs>
          <Childrens></Childrens>
        </div>
      </form>
    </>
  );
};

export default Form;
