import React, { useState, useEffect } from 'react';
import {View, Text, ScrollView, FlatList, TouchableOpacity} from "react-native"
import { useFonts } from "expo-font"
import * as database from '../../../database';
import styles from './Styles';
import Icon from 'react-native-vector-icons/FontAwesome5'
import { useNavigation } from '@react-navigation/native';
import { useIsFocused } from '@react-navigation/native';



const UpcomingComponent = () => {
    const [trips, setTrips] = useState([]);
    const navigation = useNavigation();
    const isFocused = useIsFocused();

    const handleTripPress = (selectedItem) => {
      const sanitizedItem = {
        id: selectedItem.id,
        destination: selectedItem.destination,
        notes: selectedItem.notes,
        startDate: selectedItem.startDate,
        endDate: selectedItem.endDate,
        tripName: selectedItem.tripName,
        tripTag: selectedItem.tripTag
      };
      navigation.navigate('TripDetail', { item: sanitizedItem })
    };

    const fetchData = async () => {
      try {
        const data = await database.load();
        setTrips(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    useEffect(() => {
      if (isFocused) {
        fetchData();
      }
    }, [isFocused]);

    const [fontLoaded] = useFonts({
        'bai': require('../../../../assets/fonts/BaiJamjuree-Bold.ttf'),
      });
    
    if (!fontLoaded) {
      return null;
    }

    return (
        <View style={styles.container}>
            <Text style={styles.upcomingTxt}>UPCOMING</Text>
                <FlatList
                    data={trips}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <TouchableOpacity style={styles.upcomingList} onPress={() => handleTripPress(item)}>
                            <View style={styles.upcomingListDetails}>
                                <Text style={styles.upcomingListDestination}>{item.destination}</Text>
                                <Text style={styles.upcomingListStartDate}>{item.startDate}</Text>
                            </View>
                            <View style={styles.upcomingListButton}>
                                <Icon name="angle-right" size={30} color="#000" />
                            </View>
                        </TouchableOpacity>
                    )}
                    />
        </View>
    )
}

export default UpcomingComponent