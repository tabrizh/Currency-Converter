import { useEffect, useState } from 'react';
import './App.css';
import CurrencyInput from './components/CurrencyInput';
import Header from './components/Header';
import axios from 'axios';
import { SwitchHorizontalIcon } from '@heroicons/react/solid';
import Footer from './components/Footer';
import { images } from '../src/constants';

const App = () => {
  const [num1, setNum1] = useState(1);
  const [num2, setNum2] = useState(1);
  const [currency1, setCurrency1] = useState('UAH');
  const [currency2, setCurrency2] = useState('USD');
  const [data, setData] = useState([]);
  const [lastUpdate, setLastUpdate] = useState(Date.now());
  const [loading, setLoading] = useState(false);

  const fixerURL =
    'http://data.fixer.io/api/latest?access_key=7eddae10c5a9f28fbadf5b9b6e52cfdd&base=UAH';

  const fetchData = () => {
    axios
      .get(fixerURL)
      .then(res => {
        setData(res.data.rates);
        setLastUpdate(res.data.timestamp);
      })
      .catch(error => console.log(error));
  };

  useEffect(() => {
    setLoading(true);
    fetchData();
    if (data) setLoading(false);
  }, []);

  useEffect(() => {
    if (!!data) handleNum1Change(1);
  }, [data]);

  const sliceNum = num => {
    return num.toFixed(4);
  };

  const handleNum1Change = num1 => {
    setNum2(sliceNum((num1 * data[currency2]) / data[currency1]));
    setNum1(num1);
  };

  const handleCurrency1Change = currency1 => {
    setNum2(sliceNum((num1 * data[currency2]) / data[currency1]));
    setCurrency1(currency1);
  };

  const handleNum2Change = num2 => {
    setNum1(sliceNum((num2 * data[currency1]) / data[currency2]));
    setNum2(num2);
  };

  const handleCurrency2Change = currency2 => {
    setNum1(sliceNum((num2 * data[currency1]) / data[currency2]));
    setCurrency2(currency2);
  };

  const switchHandler = () => {
    setCurrency1(currency2);
    setCurrency2(currency1);
  };

  const todaysCurrencies = [
    sliceNum(+data['USD']) + ' USD',
    sliceNum(+data['EUR']) + ' EUR',
    sliceNum(+data['GBP']) + ' GBP',
  ];

  const fotmattedLastUpdate = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  }).format(lastUpdate[lastUpdate.legth - 1]);

  return loading ? (
    <p>Loading...</p>
  ) : (
    <div className="App flex flex-col items-center justify-center absolute top-0 bottom-0 right-0 left-0 m-auto">
      <div className="relative w-full flex justify-start">
        <img
          className="w-[100px] sm:w-[120px] my-auto ukraine-heart absolute left-8 bottom-4"
          src={images.ukraineFlag}
          alt="Ukraine flag"
        />
      </div>
      <Header todaysCurrencies={todaysCurrencies} />
      <div className="flex-col md:flex-row flex w-full md:w-3/6">
        <CurrencyInput
          currencies={Object.keys(data)}
          amount={+num1}
          currency={currency1}
          onNumChange={handleNum1Change}
          onCurrencyChange={handleCurrency1Change}
        />
        <SwitchHorizontalIcon
          className="flex-shrink-0 h-8 w-8 text-gray-400 my-5 md:my-0 md:mx-3 self-center cursor-pointer"
          aria-hidden="true"
          onClick={switchHandler}
        />
        <CurrencyInput
          currencies={Object.keys(data)}
          amount={+num2}
          currency={currency2}
          onNumChange={handleNum2Change}
          onCurrencyChange={handleCurrency2Change}
        />
      </div>
      <Footer lastUpdate={fotmattedLastUpdate} />
    </div>
  );
};

export default App;
