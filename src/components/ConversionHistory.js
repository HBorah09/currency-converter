import React, { useEffect, useState } from 'react';
import  BarChart  from "react-bar-chart";
import { BASE_API, APP_ID, DEFAULT_CURRENCY } from '../constants';

const ConversionHistory = () => {
    const [conversionHistory, setConversionHistory] = useState([])
    const [currency, setCurrency] = useState(DEFAULT_CURRENCY);
    useEffect(() => {
        if (!conversionHistory.length) {
            getConversionHistory();
        }
    }, []);

    const getDates = () => {
        const datesOfLast2Weeks = [];
        for(let i=0; i<14; i++) {
            const date = new Date(new Date().getTime()-(i*24*60*60*1000));
            datesOfLast2Weeks.push(date.toISOString().split('T')[0]);
        }
        return datesOfLast2Weeks;
    }

    const getConversionHistory = async () => {
        const dates = getDates();
        const promises = dates.map(async date => {
            const response = await fetch(`${BASE_API}historical/${date}.json?app_id=${APP_ID}`);
            const data =  await response.json();
            return {
                rates: data.rates,
                date
            };
        });

         const allData = await Promise.all(promises);
         setConversionHistory(allData);
    }

    const renderCurrencyOptions = () => {
        const oneDayData = conversionHistory[0].rates;
        const currencies = Object.keys(oneDayData);
        return(
            currencies.map(currency => <option key={currency} value={currency}>{currency}</option>)
        )
    }

    const getData = () => {
        return conversionHistory.map(data => ({
            value: data.rates[`${currency}`], text: data.date
        }))
    }

    const margin = {top: 20, right: 20, bottom: 30, left: 40};
  return (
    <div>
        <h1>Conversion History</h1>
        {conversionHistory.length ? (
            <>
                <span className='label'>Currency:</span>
                <select value={currency} onChange={e => setCurrency(e.target.value)} >
                    {renderCurrencyOptions()}
                 </select>
                 <div>
                    <BarChart width={1400} height={500} margin={margin} data={getData()} />
                 </div>
            </>
        ) : 'Loading...'
    }
    </div>
  )
}

export default ConversionHistory