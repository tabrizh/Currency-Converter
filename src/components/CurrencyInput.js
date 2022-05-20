import React from 'react';
import PropTypes from 'prop-types';
import currencySymbol from 'currency-symbol';

const CurrencyInput = props => {
  return (
    <div className="w-64 mx-auto">
      <div className="mt-1 relative rounded-md shadow-sm">
        <input
          type="text"
          className="focus:ring-indigo-500 focus:border-indigo-500 block w-full p-4 sm:text-2xl border-gray-300 rounded-md"
          placeholder="0.00"
          value={props.amount ? props.amount : ''}
          onChange={e => props.onNumChange(e.target.value)}
        />
        <div className="absolute inset-y-0 right-0 flex items-center">
          <select
            className="focus:border-slate-300 focus:shadow-none h-full py-0 pl-2 pr-7 border-transparent bg-transparent text-gray-500 sm:text-sm rounded-md rounded-l-none border-l-1 border-slate-300"
            value={props.currency}
            onChange={e => props.onCurrencyChange(e.target.value)}
          >
            {props.currencies.map(currency => (
              <option key={currency} value={currency}>
                {currency}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

CurrencyInput.propTypes = {
  amount: PropTypes.number.isRequired,
  currency: PropTypes.string.isRequired,
  currencies: PropTypes.array,
  onNumChange: PropTypes.func,
  onCurrencyChange: PropTypes.func,
};

export default CurrencyInput;
