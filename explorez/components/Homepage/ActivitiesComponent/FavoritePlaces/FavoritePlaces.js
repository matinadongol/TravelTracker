import React, { useState, useEffect } from 'react';
import {View, Text, ScrollView, FlatList, TouchableOpacity, Alert} from "react-native"
import { useFonts } from "expo-font"
import { useIsFocused } from '@react-navigation/native'
import * as database from '../../../database'
import styles from './Styles'
import Icon from 'react-native-vector-icons/FontAwesome5';

const FavoritePlaces = () => {
    const [favoritePlaces, setFavoritePlaces] = useState({})
    const isFocused = useIsFocused()
    const fetchData = async () => {
        try {
          const data = await database.loadFavoritePlaces()
            if (Array.isArray(data)) {
                setFavoritePlaces(data);
            } else {
                console.error('Data fetched is not an array:', data);
            }
        } catch (error) {
          console.error('Error fetching data:', error);
        }
    }
    useEffect(() => {
    if (isFocused) {
        fetchData();
    }
    }, [isFocused])

    const deleteFavoritePlaces = async (id) => {
        try {
          await database.removeFavoritePlaces(id);
          setFavoritePlaces(prevPlaces => prevPlaces.filter(place => place.id !== id));
        } catch (error) {
          console.error('Error deleting from Firestore:', error);
        }
      };
    
      const handleDelete = (id, name) => {
        Alert.alert(
          'Confirm Deletion',
          `Are you sure you want to delete ${name}?`,
          [
            {
              text: 'Cancel',
              style: 'cancel',
            },
            {
              text: 'Delete',
              onPress: () => deleteFavoritePlaces(id),
              style: 'destructive',
            },
          ],
          { cancelable: true }
        );
      };
    return (
        <>
        <FlatList
            data={favoritePlaces}
            keyExtractor={(item, index) => index.toString()} 
            renderItem={({ item }) => (
                <View style={styles.favoritePlaceContainer} >
                    <View>
                      <Text style={styles.cityName}>{item.cityName}</Text>
                        <Text style={styles.favoritePlaceName}>{item.name}</Text>
                        <Text style={styles.favoritePlaceAddress}>{item.address}</Text>
                    </View>
                        <TouchableOpacity onPress={() => handleDelete(item.id, item.name)} >
                        <Icon
                            name="trash"
                            size={30}
                            color='#db2f23'
                        />
                        </TouchableOpacity>
                </View>
            )}
            />
        </>
    )
}
export default FavoritePlaces