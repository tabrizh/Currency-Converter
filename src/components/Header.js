import React from 'react';
import { SwitchHorizontalIcon } from '@heroicons/react/solid';
import MovingComponent from 'react-moving-text';

const Header = props => {
  return (
    <div className="lg:flex lg:items-center lg:justify-between m-10 mb-5 text-center">
      <div className="flex-1 min-w-0">
        <h2 className="leading-10 text-4xl font-bold text-gray-900 md:text-5xl lg:text-7xl sm:truncate pb-7">
          Easy Hryvnia Converter
        </h2>
        <div className="mt-1 flex flex-col lg:flex-row sm:flex-wrap sm:mt-0 sm:space-x-6 items-center justify-center">
          <div className="mt-2 flex items-center text-sm text-gray-500">
            <p className="text-2xl">1 UAH</p>
            <SwitchHorizontalIcon
              className="flex-shrink-0 h-4 w-4 text-gray-400 mx-3"
              aria-hidden="true"
            />
            <div className="text-2xl w-[150px]">
              <MovingComponent
                type="typewriter"
                duration="10000ms"
                dataText={props.todaysCurrencies}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
