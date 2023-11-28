import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import axios from 'axios';
import * as Location from 'expo-location';

const API_KEY = 'AIzaSyCZwuGGoteEDb8WXpMycqaxczfSR1nuZyU'
//const API_KEY = 'AIzaSyAben9PgAFjIVOIEKA4NUv0rN_dLgcp1cE'

const NearbyPlacesComponent = ({ route }) => {
  const [nearbyPlaces, setNearbyPlaces] = useState([]);
  const { cityName, type } = route.params;

  useEffect(() => {
    const fetchCoordinates = async () => {
      try {
        let location;
        //console.log(cityName)
        if (!cityName) {
          const { status } = await Location.requestForegroundPermissionsAsync();
          if (status !== 'granted') {
            console.error('Permission to access location was denied');
            return;
          }
          location = await Location.getCurrentPositionAsync({});
        } else {
          const geocodeResponse = await axios.get(
            `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(cityName)}&key=${API_KEY}`
          );
          //console.log(geocodeResponse)
          if (
            geocodeResponse.data &&
            geocodeResponse.data.results &&
            geocodeResponse.data.results.length > 0
          ) {
            const { geometry } = geocodeResponse.data.results[0];
            if (geometry && geometry.location) {
              location = geometry.location;
            } else {
              console.error('Invalid geometry/location data in the geocode response.');
              return;
            }
          } else {
            console.error('No results found in the geocode response.');
            return;
          }
        }

        const { lat, lng } = location
        const placesResponse = await axios.get(
          `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=1500&type=${type}&key=${API_KEY}`
        );

        if (placesResponse.data && placesResponse.data.results) {
          const placesData = placesResponse.data.results.map(place => ({
            name: place.name,
            address: place.vicinity,
          }));
          setNearbyPlaces(placesData);
        } else {
          console.error('No nearby places found.');
          setNearbyPlaces([]);
        }
      } catch (error) {
        console.error('Error fetching nearby places:', error);
        setNearbyPlaces([]);
      }
    };

    fetchCoordinates();
  }, [cityName, type]);

  return (
    <View>
      <Text>Nearby Places:</Text>
      {nearbyPlaces.map((place, index) => (
        <View key={index}>
          <Text>Name: {place.name}</Text>
          <Text>Address: {place.address}</Text>
        </View>
      ))}
    </View>
  );
};

export default NearbyPlacesComponent;
