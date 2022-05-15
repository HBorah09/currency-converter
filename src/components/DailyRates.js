import React, { useState } from 'react';
import { DEFAULT_CURRENCY } from '../constants';

const DailyRates = ({ conversionRates }) => {
    const [currency, setCurrency] = useState(DEFAULT_CURRENCY);
    return(
        <>
            <h1>Daily Rates</h1>
            <select value={currency} onChange={e => setCurrency(e.target.value)}>
                {Object.keys(conversionRates).map(currency => <option>{currency}</option>)}
            </select>
            <h2>Today's rate:</h2>
            <h3>{conversionRates[`${currency}`]} USD</h3>
        </>
    )    
}

export default DailyRates;