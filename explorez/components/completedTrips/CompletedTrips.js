import React, {useEffect, useState} from 'react';
import { StyleSheet } from 'react-native';
import {View, Text, ScrollView, FlatList, TouchableOpacity} from "react-native"
import { useIsFocused } from '@react-navigation/native';
import * as database from '../database';
import Icon from 'react-native-vector-icons/FontAwesome5'
import { useNavigation } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { FontAwesome } from '@expo/vector-icons'; 
import Modal from 'react-native-modal';

const CompletedTrips = () => {
    const [completedTrips, setCompletedTrips] = useState([]);
    const [filteredTrips, setFilteredTrips] = useState([]);
    const [showFilteredTrips, setShowFilteredTrips] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const isFocused = useIsFocused();
    const navigation = useNavigation();

    useEffect(() => {
        if (isFocused) {
          fetchData();
        }
      }, [isFocused]);

      React.useLayoutEffect(() => {
        navigation.setOptions({
          headerRight: () => (
            <TouchableOpacity onPress={handleFilterPress} style={{ marginRight: 10 }}>
              <FontAwesome name="filter" size={20} color="#21A6FC" />
            </TouchableOpacity>
          ),
        });
      }, [navigation]);

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

      const handleFilterPress = () => {
        setIsModalVisible(true);
      };
    
      const handleFilter = (filterType) => {
        let filteredData = [];
  
        switch (filterType) {
          case 'Business':
            filteredData = completedTrips.filter(async (trip) => {
              try {
                const data = await database.getFilteredTrips('Business', true);
                setFilteredTrips(data);
                console.log(data)
              } catch (error) {
                console.error('Error fetching data:', error);
              }
            });
            break;
          case 'Leisure':
            filteredData = completedTrips.filter(async (trip) => {
              try {
                const data = await database.getFilteredTrips('Leisure', true);
                setFilteredTrips(data);
                console.log(data)
              } catch (error) {
                console.error('Error fetching data:', error);
              }
            });
            break;
          case 'Educational':
            filteredData = completedTrips.filter(async (trip) => {
              try {
                const data = await database.getFilteredTrips('Educational', true);
                setFilteredTrips(data);
                console.log(data)
              } catch (error) {
                console.error('Error fetching data:', error);
              }
            });
            break;
          case 'Cultural':
            filteredData = completedTrips.filter(async (trip) => {
              try {
                const data = await database.getFilteredTrips('Cultural', true);
                setFilteredTrips(data);
                console.log(data)
              } catch (error) {
                console.error('Error fetching data:', error);
              }
            });
            break;
          default:
            filteredData = trips;
        }
        setFilteredTrips(filteredData);
      setShowFilteredTrips(true);
      setIsModalVisible(false);
      }
      const closeModal = () => {
        setIsModalVisible(false);
      };

      return (
        <View style={styles.container}>
           <Modal isVisible={isModalVisible} onBackdropPress={closeModal}>
        <View style={styles.modalContainer}>
          <TouchableOpacity onPress={() => handleFilter('Business')} style={styles.menuButton}>
            <Text>Business</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleFilter('Leisure')} style={styles.menuButton}>
            <Text>Leisure</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleFilter('Cultural')} style={styles.menuButton}>
            <Text>Educational</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleFilter('Educational')} style={styles.menuButton}>
            <Text>Cultural</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleFilter('None')} style={styles.menuButton}>
            <Text>All</Text>
          </TouchableOpacity>
        </View>
      </Modal>
            <View style={styles.list}>
            
            <FlatList
                data={showFilteredTrips ? filteredTrips : completedTrips}
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
        backgroundColor: '#F0F0F0'
    },
    upcomingTxt:{
        fontFamily:'bai',
        fontSize:20,
        color:'#8B8B8B',
        marginBottom: 15
    },
    upcomingList:{
        display: 'flex',
        alignItems: 'stretch',
        justifyContent: 'space-between',
        flexDirection: 'row',
        marginBottom: 15,
        borderColor: '#E2E2E2',  
        borderWidth: 5, 
        borderRadius: 10,
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: 'white'
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
        marginHorizontal: 30,
        marginVertical:25
    },
    filterButton: {
      padding: 10,
      borderRadius: 5,
      backgroundColor: '#EFEFEF',
      marginLeft: 10,
    },
  
    modalContainer: {
      backgroundColor: 'white',
      padding: 20,
      borderRadius: 10,
    },
    menuButton: {
      padding: 15,
      borderBottomWidth: 1,
      borderBottomColor: '#EFEFEF',
    },

})

export default CompletedTrips
