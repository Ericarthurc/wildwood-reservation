import React from 'react';

import Service from './Service/Service';

const Services = props => {
  // const arrayOne = props.services.slice(0, 2);
  // const arrayTwo = props.services.slice(2);
  const arrayOne = props.services;

  const one = arrayOne.map((service, index) => {
    return (
      <Service
        serviceHandler={props.serviceHandler}
        checked={props.checked}
        name={service.name}
        seats={service.seats}
        _id={service._id}
        key={service._id}
      />
    );
  });
  // const two = arrayTwo.map((service, index) => {
  //   return (
  //     <Service
  //       serviceHandler={props.serviceHandler}
  //       checked={props.checked}
  //       name={service.name}
  //       seats={service.seats}
  //       _id={service._id}
  //       key={service._id}
  //     />
  //   );
  // });

  return <>{one}</>;
};

export default Services;
