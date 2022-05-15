import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ConversionHistory from './components/ConversionHistory';
import CurrencyConverter from './components/CurrencyConverter';
import DailyRates from './components/DailyRates';
import NavBar from './components/NavBar';
import { BASE_API, APP_ID } from './constants';

import './App.scss';

const App = () => {
  const [conversionRates, setConversionRates] = useState({})

  useEffect(() => {
    getConversionRates();
    setInterval(getConversionRates, 120000);   // calling the api every 2minutes to account for conversion rate updates
}, []);

const getConversionRates = async () => {
  const response = await fetch(`${BASE_API}latest.json?app_id=${APP_ID}`);
  let data;
  try {
      data = await response.json();
      setConversionRates(data.rates);
  }catch(error){
      console.log("Error Occured!!", error)
  }
}

  return (
    <div className="app">
      <Router>
        <NavBar />
        <Routes>
          <Route exact path="/" element={<CurrencyConverter conversionRates={conversionRates} />} />
          <Route exact path="/history" element={<ConversionHistory />} />
          <Route exact path="/rates" element={<DailyRates conversionRates={conversionRates} />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
