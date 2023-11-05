import React, {useEffect, useState} from 'react';
import { StyleSheet } from 'react-native';
import {View, Text, ScrollView, FlatList, TouchableOpacity} from "react-native"
import { useIsFocused } from '@react-navigation/native';
import * as database from '../database';
import Icon from 'react-native-vector-icons/FontAwesome5'
import { useNavigation } from '@react-navigation/native';
import { useFonts } from 'expo-font';

const CompletedTrips = () => {
    const [completedTrips, setCompletedTrips] = useState([]);
    const isFocused = useIsFocused();
    const navigation = useNavigation();



    useEffect(() => {
        if (isFocused) {
          fetchData();
        }
      }, [isFocused]);

    const fetchData = async () => {
        try {
          const data = await database.getCompletedTrips();
          setCompletedTrips(data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };

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

      return (
        <View style={styles.container}>
            <View style={styles.list}>
            
            <FlatList
                data={completedTrips}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.upcomingList} onPress={() => handleTripPress(item)}>
                        <View style={styles.upcomingListDetails}>
                            <Text style={styles.completedListDestination}>{item.destination}</Text>
                            <Text style={styles.completedListStartDate}>{item.startDate}</Text>
                        </View>
                        <View style={styles.upcomingListButton}>
                            <Icon name="angle-right" size={30} color="#000" />
                        </View>
                    </TouchableOpacity>
                )}
                />
                </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    upcomingTxt:{
        fontFamily:'bai',
        fontSize:25,
        color:'black',
        marginBottom: 15
    },
    upcomingList:{
        display: 'flex',
        alignItems: 'stretch',
        justifyContent: 'space-between',
        flexDirection: 'row',
        marginBottom: 25,
        borderColor: '#d8f5f4',  
        borderWidth: 5, 
        borderRadius: 10,
        padding: 20
    },
    completedListDestination:{
        fontSize: 25,
        fontWeight: '500',
        marginBottom: 3,
        fontFamily: 'bai'
    },
    completedListStartDate: {
      fontFamily: 'Bai-Jamjuree'
    },
    list: {
        marginHorizontal: 30
    }

})

export default CompletedTrips