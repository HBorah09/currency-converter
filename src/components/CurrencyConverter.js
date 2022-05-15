import React, { useState, useEffect } from 'react';
import { IMAGE_URL, DEFAULT_CURRENCY } from '../constants';

const CurrencyConverter = ({ conversionRates }) => {
    const [leftValue, setLeftValue] = useState('');
    const [rightValue, setRightValue] = useState('');
    const [currency, setCurrency] = useState('CHF');

    useEffect(() => {
        convertValue();
    }, [leftValue, currency]);

    useEffect(() => {
        updateEuros();
    }, [rightValue]);


    const convertValue = () => {
        if(conversionRates && conversionRates[`${currency}`] && leftValue>=0) {
            const result = leftValue * (conversionRates[`${currency}`]/ conversionRates[`${DEFAULT_CURRENCY}`]);
            setRightValue(Math.round(result * 100) / 100);
        }
    }

    const updateEuros = () => {
        if(conversionRates && conversionRates[`${currency}`] && rightValue>=0) {
            const result = rightValue * (conversionRates[`${DEFAULT_CURRENCY}`]/conversionRates[`${currency}`]);
            setLeftValue(Math.round(result * 100) / 100);
        }
    }

    return(
        <div>
        <h1>Currency Converter</h1>
        <div className='conversion-contianer'>
            <div>
                <label className='label'>Enter value in Euros</label>
                <input type="number" min="0" value={leftValue} onChange={e => setLeftValue(e.target.value)} />
                {leftValue<0 && <span className='label error'>Only positive numbers please!</span>}
            </div>
            <div className='symbol-container'>
                <img src={IMAGE_URL} alt='currency conversion'/>
            </div>
            <div className='result'>
                <div>
                    <input type="radio" id="CHF" checked={currency=== 'CHF'} name="convert_currency" value="CHF" onChange={e => setCurrency(e.target.value)} />
                    <label htmlFor='CHF'>CHF</label>
                    <input type="radio" id="USD" checked={currency=== 'USD'} name="convert_currency" value="USD" onChange={e => setCurrency(e.target.value)} />
                    <label htmlFor='USD'>USD</label>
                </div>
                <input type="number" min="0" value={rightValue} onChange={e => setRightValue(e.target.value)} />
                {rightValue<0 && <span className='label error'>Only positive numbers please!</span>}
            </div>
        </div>
    </div>
    )
}

export default CurrencyConverter;