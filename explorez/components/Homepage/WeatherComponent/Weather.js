import {View, Image, Text, StyleSheet, FlatList,ActivityIndicator} from "react-native"
import React, { useState, useEffect } from 'react';
import { Searchbar, Card, Title, Paragraph } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from "axios";
import _ from 'lodash';

const Weather =  ({route}) => {
  
  const [destination, setDestination] = useState(route.params);
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  const getWeatherData = async () => {
    try {
      const response = await axios.get(
        `https://api.weatherapi.com/v1/forecast.json?key=aac7791fc2cf4990914142821221612&q=${destination}&days=3`
      );
      if(response.data !== null) {
        setWeatherData(response.data.current);
        setForecastData(response.data.forecast)
      }
      
      console.log(response.data);
    } catch (err) {
    }
    finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getWeatherData();
  }, [destination]); 

  const handleSearch = () => {
    setWeatherData(null);
    setDestination(searchTerm)
  };

  const getWeatherIcon = (conditionCode) => {
    switch (conditionCode) {
      case 1000:
        return 'weather-sunny';
      case 1003:
        return 'weather-partly-cloudy';
      case 1006:
      case 1009:
        return 'weather-cloudy';
      case 1030:
      case 1135:
      case 1147:
        return 'weather-fog';
      case 1063:
      case 1180:
      case 1183:
      case 1186:
      case 1189:
      case 1192:
      case 1195:
      case 1198:
        return 'weather-rainy';
      case 1066:
      case 1210:
      case 1213:
      case 1216:
      case 1219:
      case 1222:
      case 1225:
      case 1237:
      case 1240:
      case 1243:
      case 1246:
        return 'weather-snowy';
      case 1069:
      case 1273:
      case 1276:
        return 'weather-lightning';
      default:
        return 'weather-sunny'; 
    }
  };

  if (loading) {
    return (
      <View>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  const renderForecastItem = ({ item }) => (
    <Card style={styles.forecastCard}>
      <Card.Content>
        <Title  style={styles.text}>{item.date}</Title>
        <MaterialCommunityIcons name={getWeatherIcon(item.day.condition.code)} size={30} color="#000" />
        <Paragraph style={styles.text}>{item.day.condition.text}</Paragraph>
        <Paragraph style={styles.text}>Max Temp: {item.day.maxtemp_c}°C</Paragraph>
        <Paragraph style={styles.text}>Min Temp: {item.day.mintemp_c}°C</Paragraph>
      </Card.Content>
    </Card>
  );
  return (
    <View style={styles.container}>
      <Searchbar
        placeholder="Enter destination..."
        onChangeText={(text) => setSearchTerm(text)}
        onSubmitEditing={handleSearch}
        style={styles.searchBar}
      />
      {weatherData ?
        (<View style={styles.weatherStyle}>
          <MaterialCommunityIcons
                name={getWeatherIcon(weatherData.condition.code)}
                size={50}
                color="#21A6FC"
              />
          <Text style={{fontFamily: 'bai', textTransform: 'uppercase', fontSize: 20}}>{destination}</Text>
          <Text style={{fontFamily: 'bai', fontSize: 30}}>{weatherData.temp_c}°C</Text>
          <Text style={styles.text}>{weatherData.condition.text}</Text> 
        </View>)
        :(
        <View style={styles.weatherStyle}>
         
          <Text  style={{...styles.text, fontSize: 30}}>Invalid Location</Text>
          </View>
      )}
      {forecastData ? (
        <View style={styles.forecastSyle}>
          <FlatList
            data={forecastData.forecastday}
            renderItem={renderForecastItem}
            keyExtractor={(item) => item.date}
            vertical
            showsVerticalScrollIndicator={false}
            style={styles.forecastList}
          />
        </View>
      ) : null}
        
    </View>
  )

    
}

const styles = StyleSheet.create({
    container: {
      flex: 1
    },
    searchBar: {
      margin: 20,
    },
    forecastList: {
      margin: 20,
      fontFamily: 'Bai-Jamjuree'
    },
    forecastCard: {
      margin: 16,
      width: 280,
    },
    forecastSyle: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    weatherStyle: {
      justifyContent: 'center',
      alignItems: 'center'
    },
    scrollContainer: {
      justifyContent: 'space-between',
      paddingBottom: 300, 
      backgroundColor: '#F0F0F0',
      flexGrow: 1,
      paddingTop:30
    },
    text: {
      fontFamily: 'Bai-Jamjuree'
    }
})

export default Weather