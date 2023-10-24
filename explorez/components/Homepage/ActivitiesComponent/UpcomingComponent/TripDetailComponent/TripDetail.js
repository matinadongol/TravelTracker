import React, { useState } from 'react';
import { View, Text, TextInput, Pressable } from 'react-native';
import * as database from '../../../../database';
import { useNavigation } from '@react-navigation/native';
import styles from './Styles'; // Import the styles from the styles.js file

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
    } catch (error) {
      console.error('Error updating trip:', error);
    }
  };

  if (!item) {
    return (
      <View style={styles.container}>
        <Text>No item data available</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Trip Details</Text>
      <View style={styles.inputContainer}>
        <Text style={[styles.text, styles.heading]}>Place: </Text>
        <TextInput
          style={styles.input}
          onChangeText={setEditedDestination}
          value={editedDestination}
        />
        <Text style={[styles.text, styles.heading]}>Date of Departure: </Text>
        <TextInput
          style={styles.input}
          onChangeText={setEditedStartDate}
          value={editedStartDate}
        />
        <Text style={[styles.text, styles.heading]}>Date of Arrival: </Text>
        <TextInput
          style={styles.input}
          onChangeText={setEditedEndDate}
          value={editedEndDate}
        />
        <Text style={[styles.text, styles.heading]}>Occasion: </Text>
        <TextInput
          style={styles.input}
          onChangeText={setEditedTripName}
          value={editedTripName}
        />
        <Text style={[styles.text, styles.heading]}>Reason of Trip: </Text>
        <TextInput
          style={styles.input}
          onChangeText={setEditedTripTag}
          value={editedTripTag}
        />
        <Text style={[styles.text, styles.heading]}>Additional Comments: </Text>
        <TextInput
          style={styles.input}
          onChangeText={setEditedNotes}
          value={editedNotes}
        />
      </View>
      <Pressable
  style={({ pressed }) => [
    styles.updateButton,
    pressed ? styles.updateButtonPressed : null,
  ]}
  onPress={handleUpdate}
>
  <Text style={styles.buttonText}>UPDATE</Text>
</Pressable>
    </View>
  );
};

export default TripDetail;
