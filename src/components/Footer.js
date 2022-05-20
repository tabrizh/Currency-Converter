import React from 'react';

const Footer = props => {
  return (
    <div className="relative w-full flex justify-center">
      <p className="text-sm tracking-wide text-gray-600 absolute top-24 md:top-36">
        Last Updated: {props.lastUpdate}
      </p>
    </div>
  );
};

export default Footer;
