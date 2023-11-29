import React, { useState, useEffect } from 'react';
import {View, Text, ScrollView, FlatList, TouchableOpacity} from "react-native"
import { useFonts } from "expo-font"
import * as database from '../../../database';
import styles from './Styles';
import Icon from 'react-native-vector-icons/FontAwesome5'
import { useNavigation } from '@react-navigation/native';
import { useIsFocused } from '@react-navigation/native';
import * as Notifications from 'expo-notifications';

const UpcomingComponent = () => {
    const [trips, setTrips] = useState({});
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
        tripTag: selectedItem.tripTag,
        completed: selectedItem.completed
      };
      navigation.navigate('TripDetail', { item: sanitizedItem })
    };

    const scheduleNotification = async (trip) => {
      try{
        const permissions = await Notifications.getPermissionsAsync();
        const yr = trip.startDate.slice(0, -6)
        const mnth = trip.startDate.slice(5, -3)
        const dy = trip.startDate.slice(-2)
        const notificationDate =  new Date(yr, mnth-1, dy-1, 0, 0, 0);
        const notificationMessage = `Your trip to ${trip.destination} is coming up!`;

        if(!permissions.granted) {
            console.log("not granted")
            const request = await Notifications.requestPermissionsAsync({
                android: {
                    allowAlert: true,
                    allowSound: true,
                    allowBadge: true
                }
            })
            console.log("request: ", request)
            if(!request.granted) {
                return false
            }
        }

        const id = await Notifications.scheduleNotificationAsync({
            content: {
                title: 'Upcoming trip',
                body: notificationMessage,
                sound: true,
                data: {
                    type: 'reminder'
                }
            },
            trigger: {
                date: notificationDate,
                repeats: true
            }
        })

        if(!id) {
            return false
        }
        return true
    }
    catch{
        return false
    }
    };

    const fetchData = async () => {
      try {
        const data = await database.load();
    
        setTrips(data);
        
        data.forEach(trip => {
          scheduleNotification(trip);
        });
        
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
                <FlatList style={styles.listContainer}
                    data={trips}
                    keyExtractor={(item) => item.id}
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