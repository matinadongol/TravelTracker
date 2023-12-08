import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Pressable, Alert } from 'react-native';
import axios from 'axios';
import * as Location from 'expo-location';
import * as database from '../../../../database';
import styles from './Styles';
import Icon from 'react-native-vector-icons/FontAwesome5'

const API_KEY = 'AIzaSyCZwuGGoteEDb8WXpMycqaxczfSR1nuZyU'; 

const NearbyPlacesComponent = ({ route }) => {
  const [nearbyPlaces, setNearbyPlaces] = useState([]);
  const { cityName, type } = route.params;

  useEffect(() => {
    const fetchCoordinates = async () => {
      try {
        let location;

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

        const { lat, lng } = location;
        const placesResponse = await axios.get(
          `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=1500&type=${type}&key=${API_KEY}`
        );

        if (placesResponse.data && placesResponse.data.results) {
          const placesData = placesResponse.data.results.map(place => ({
            id: place.place_id,
            name: place.name,
            address: place.vicinity,
            isFavorite: false, 
            cityName: cityName
          }));

          setNearbyPlaces(prevPlaces => {
            const updatedPlaces = placesData.map(place => {
              const foundPlace = prevPlaces.find(p => p.id === place.id);
              return foundPlace ? { ...foundPlace, isFavorite: place.isFavorite } : place;
            });
            return updatedPlaces;
          });

          await fetchFavoritesFromFirestore(placesData);
        } else {
          console.error('No nearby places found.');
          setNearbyPlaces([]);
        }
      } catch (error) {
        console.error('Error fetching nearby places:', error);
        setNearbyPlaces([]);
      }
    };

    const fetchFavoritesFromFirestore = async (placesData) => {
      try {
        const favorites = await database.getFavoritePlaces();

        const favoritesArray = Object.keys(favorites).map(key => ({
          id: key,
          ...favorites[key],
        }));

        const updatedNearbyPlaces = placesData.map(place => ({
          ...place,
          isFavorite: favoritesArray.some(fav => fav.id === place.id),
        }));

        setNearbyPlaces(updatedNearbyPlaces);
      } catch (error) {
        console.error('Error fetching favorite places:', error);
      }
    };

    fetchCoordinates();
  }, [cityName, type]);

  const toggleFavoritePlace = async (placeIndex) => {
    try {
      const updatedPlaces = [...nearbyPlaces];
      const currentPlace = updatedPlaces[placeIndex]
  
      const isAlreadyFavorite = currentPlace.isFavorite
      const isInFavorites = nearbyPlaces.some(
        place => place.name === currentPlace.name && place.isFavorite === true
      );

      if (isInFavorites) {
        Alert.alert(`${currentPlace.name} is in your favorite list`);
        return;
      }

      currentPlace.isFavorite = !isAlreadyFavorite;
  
      setNearbyPlaces([...updatedPlaces])
  
      if (!isAlreadyFavorite) {
        const docId = await database.saveFavoritePlace(currentPlace)
        currentPlace.id = docId;
        setNearbyPlaces([...updatedPlaces])
      } else {
        const idToRemove = currentPlace.id
        await database.removeFavoritePlaces(idToRemove)
        const updatedPlaceWithoutId = { ...currentPlace }
        delete updatedPlaceWithoutId.id
        updatedPlaces[placeIndex] = updatedPlaceWithoutId
        setNearbyPlaces([...updatedPlaces])
      }
    } catch (error) {
      console.error('Error toggling favorites:', error)
    }
  };
  
  return (
    <ScrollView style={styles.container}> 
      <View style={styles.containerBack}>
        {nearbyPlaces.map((place, index) => (
          <View key={index} style={styles.placesContainer}>
            <View style={styles.placesDescription}>
              <Text style={styles.placeNameLabel}>{place.name}</Text>
              <Text>{place.address}</Text>
            </View>
            <Pressable onPress={() => toggleFavoritePlace(index)}>
              <Icon
                name="heart"
                size={30}
                color={place.isFavorite ? 'red' : '#000'}
              />
            </Pressable>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default NearbyPlacesComponent;
