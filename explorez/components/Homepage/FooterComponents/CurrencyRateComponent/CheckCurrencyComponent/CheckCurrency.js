import {View, TextInput, Text, StyleSheet, Pressable} from "react-native"
import React, {useState, useEffect} from 'react'
import RNPickerSelect from 'react-native-picker-select'
import styles from './Styles'
import axios from 'axios'

const CheckCurrencyComponent = () => {
    const [fromCurrency, setFromCurrency] = useState('');
    const [toCurrency, setToCurrency] = useState('');
    const [exchangeRate, setExchangeRate] = useState(null);
    const [previousExchangeRates, setPreviousExchangeRates] = useState([]);
    const [currencyCodes, setCurrencyCodes] = useState([]);

    useEffect(() => {
      const fetchCurrencyCodes = async () => {
          try {
              const response = await axios.get(
                  'https://open.er-api.com/v6/latest/USD'
              );
              const { rates } = response.data;
              const codes = Object.keys(rates).map((code) => ({ label: code, value: code, key: code }));
              setCurrencyCodes(codes);
              //console.log(codes)
              setCurrencyCodes(codes);
          } catch (error) {
              console.error('Error fetching currency codes:', error);
          }
      };

      fetchCurrencyCodes();
    }, []);

    const apikey = "JBZXNKLCK9P9OWNF"
    //const apikey = "8U8CYTTA2JW54MQ1"

    const getExchangeRate = async () => {
        try {
          // console.log('From Currency:', fromCurrency);
          // console.log('To Currency:', toCurrency);
          const response = await axios.get(
            `https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=${fromCurrency}&to_currency=${toCurrency}&apikey=8U8CYTTA2JW54MQ1`
          );
          setExchangeRate(response.data['Realtime Currency Exchange Rate']['5. Exchange Rate']);
          fetchPreviousDaysExchangeRates()
        } catch (error) {
          console.error('Error fetching exchange rate:', error);
        }
    };

    const fetchPreviousDaysExchangeRates = async () => {
        const today = new Date();
        const formattedDate = date => {
          const year = date.getFullYear();
          const month = String(date.getMonth() + 1).padStart(2, '0');
          const day = String(date.getDate()).padStart(2, '0');
          return `${year}-${month}-${day}`;
        };
  
        const getPreviousExchangeRate = async (date) => {
          try {
            const response = await fetch(
              `https://www.alphavantage.co/query?function=FX_DAILY&from_symbol=${fromCurrency}&to_symbol=${toCurrency}&apikey=8U8CYTTA2JW54MQ1`
            );
            const data = await response.json();
            if (data['Time Series FX (Daily)'][date]) {
              const exchangeRate = data['Time Series FX (Daily)'][date]['4. close'];
              return { date, rate: exchangeRate };
            } else {
              console.error(`No exchange rate data available for ${date}`);
              return { date, rate: 'N/A' };
            }
          } catch (error) {
            console.error(`Error fetching exchange rate for ${date}: ${error}`);
            return { date, rate: 'N/A' };
          }
        };
  
        const rates = [];
        for (let i = 1; i <= 5; i++) {
          const previousDate = new Date(today);
          previousDate.setDate(previousDate.getDate() - i);
          const formatted = formattedDate(previousDate);
          try {
            const exchangeRate = await getPreviousExchangeRate(formatted);
            if (exchangeRate.rate !== 'N/A') {
                rates.push(exchangeRate);
                console.log('Exchange rate fetched:', exchangeRate);
            }
        } catch (error) {
            console.error('Error fetching exchange rate:', error);
        }
          //console.log(exchangeRate)
        }
        setPreviousExchangeRates(rates);
      };

    
    return (
        <View style={styles.container}>
            <View style={styles.fromAndToSection}>
                <View>
                    <Text style={styles.labelName}>Base Currency</Text>
                    <RNPickerSelect
                        placeholder={{ label: 'Select base currency', value: null }}
                        items={currencyCodes}
                        value={fromCurrency}
                        onValueChange={(value) => setFromCurrency(value)}
                    />
                </View>
                <View>
                    <Text style={styles.labelName}>Target Currency</Text>
                    <RNPickerSelect
                        placeholder={{ label: 'Select target currency', value: null }}
                        items={currencyCodes}
                        value={toCurrency}
                        onValueChange={(value) => setToCurrency(value)}
                    />
                </View>
                
            </View>
            <Text>*Enter only currency code. Example: USD</Text>
            <Pressable onPress={getExchangeRate} style={styles.exchangeButton}>
                <Text style={styles.exchangeButtonText}>Exchange</Text>
            </Pressable> 
            <View style={styles.convertedResult}>
                <Text style={styles.labelName}>Exchange Rate</Text>
                {exchangeRate &&  
                    <Text style={styles.exchangeRate}>1 {fromCurrency} = {exchangeRate} {toCurrency}</Text>
                }
            </View>
            <View>
            <Text>Previous three days exchange rates:</Text>
                {previousExchangeRates.map(rate => (
                <Text key={rate.date}>{`${rate.date}: ${rate.rate}`}</Text>
                ))}
            </View>
        </View>
    )
}

export default CheckCurrencyComponent