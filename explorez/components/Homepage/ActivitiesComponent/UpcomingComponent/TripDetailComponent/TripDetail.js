import React, { useState} from 'react';
import { View, Text, TextInput, Pressable } from 'react-native';
import * as database from '../../../../database';
import { useNavigation } from '@react-navigation/native';

const TripDetail = ({ route }) => {
    const navigation = useNavigation();
    const { item } = route.params;
    const [editedDestination, setEditedDestination] = useState(item.destination);
    const [editedNotes, setEditedNotes] = useState(item.notes);
    const [editedStartDate, setEditedStartDate] = useState(item.startDate);
    const [editedEndDate, setEditedEndDate] = useState(item.endDate);
    const [editedTripName, setEditedTripName] = useState(item.tripName);
    const [editedTripTag, setEditedTripTag] = useState(item.tripTag);

    const handleUpdate = async () => {
        if (!item.id) {
            console.error('Invalid item ID');
            return;
        }
        const updatedData = {
          destination: editedDestination,
          notes: editedNotes,
          startDate: editedStartDate,
          endDate: editedEndDate,
          tripName: editedTripName,
          tripTag: editedTripTag,
        };
        try {
            console.log('Updated Data:', updatedData);
            await database.update(item.id, updatedData);
            navigation.navigate('Homepage');
            // setEditedDestination(updatedData.destination);
            // setEditedNotes(updatedData.notes);
            // setEditedStartDate(updatedData.startDate);
            // setEditedEndDate(updatedData.endDate);
            // setEditedTripName(updatedData.tripName);
            // setEditedTripTag(updatedData.tripTag);
          } catch (error) {
            console.error('Error updating trip:', error);
          }
    };
  
    if (!item) {
      return (
        <View>
          <Text>No item data available</Text>
        </View>
      );
    }
  
    return (
      <View>
        <View >
            <View >
            <TextInput style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10 }} onChangeText={setEditedDestination} value={editedDestination}/>
            <TextInput style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10 }} onChangeText={setEditedStartDate} value={editedStartDate}/>
            <TextInput style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10 }} onChangeText={setEditedEndDate} value={editedEndDate}/>
            <TextInput style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10 }} onChangeText={setEditedTripName} value={editedTripName}/>
            <TextInput style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10 }} onChangeText={setEditedTripTag} value={editedTripTag}/>
            <TextInput style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10 }} onChangeText={setEditedNotes} value={editedNotes}/>
            </View>
            <Pressable onPress={handleUpdate}>
                {({ pressed }) => <Text style={{ color: pressed ? 'grey' : 'black' }}>UPDATE</Text>}
            </Pressable>
      </View>
      </View>
    );
  };

export default TripDetail;
