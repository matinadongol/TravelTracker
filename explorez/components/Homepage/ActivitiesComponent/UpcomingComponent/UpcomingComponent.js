import React, { useState, useEffect } from 'react';
import {View, Text, ScrollView, FlatList} from "react-native"
import { useFonts } from "expo-font"
import * as database from '../../../database';
import styles from './Styles';
import Icon from 'react-native-vector-icons/FontAwesome5'


const UpcomingComponent = () => {
    const [trips, setTrips] = useState([]);
    const [fontLoaded] = useFonts({
        'bai': require('../../../../assets/fonts/BaiJamjuree-Bold.ttf'),
      });

      useEffect(() => {
        if (fontLoaded) {
          database.load().then((data) => {
            setTrips(data);
          });
        }
      }, [fontLoaded]);
    
      if (!fontLoaded) {
        return null;
      }

    return (
        <View style={styles.container}>
            <Text style={styles.upcomingTxt}>UPCOMING</Text>
            <ScrollView>
                <FlatList
                    data={trips}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <View style={styles.upcomingList}>
                            <View style={styles.upcomingListDetails}>
                                <Text style={styles.upcomingListDestination}>{item.destination}</Text>
                                <Text style={styles.upcomingListStartDate}>{item.startDate}</Text>
                            </View>
                            <View style={styles.upcomingListButton}>
                                <Icon name="angle-right" size={30} color="#000" />
                            </View>
                        </View>
                    )}
                    />
            </ScrollView>
        </View>
    )
}

export default UpcomingComponent