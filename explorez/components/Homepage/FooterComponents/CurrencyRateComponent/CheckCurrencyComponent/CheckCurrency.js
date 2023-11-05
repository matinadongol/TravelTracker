import {View, TextInput, Text, StyleSheet, Pressable} from "react-native"
import React, {useState} from 'react';
import { useFonts } from "expo-font"
import styles from './Styles'
import axios from 'axios'

const CheckCurrencyComponent = () => {
    const getExchangeRate = async () => {
        try {
          const response = await axios.get(
            `https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=${fromCurrency}&to_currency=${toCurrency}&apikey=8U8CYTTA2JW54MQ1`
          );
          setExchangeRate(response.data['Realtime Currency Exchange Rate']['5. Exchange Rate']);
        } catch (error) {
          console.error('Error fetching exchange rate:', error);
        }
      };

    const [fromCurrency, setFromCurrency] = useState('');
    const [toCurrency, setToCurrency] = useState('');
    const [exchangeRate, setExchangeRate] = useState(null);
    return (
        <View style={styles.container}>
            <View style={styles.fromAndToSection}>
                <View>
                    <Text style={styles.labelName}>Base Currency</Text>
                    <TextInput
                        style={styles.currencyInputSection}
                        placeholder="From"
                        value={fromCurrency}
                        onChangeText={text => setFromCurrency(text)}
                    />
                </View>
                <View>
                    <Text style={styles.labelName}>Target Currency</Text>
                    <TextInput
                        style={styles.currencyInputSection}
                        placeholder="To"
                        value={toCurrency}
                        onChangeText={text => setToCurrency(text)}
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
                    <Text style={styles.exchangeRate}>{exchangeRate}</Text>
                }
            </View>
        </View>
    )
}

export default CheckCurrencyComponent