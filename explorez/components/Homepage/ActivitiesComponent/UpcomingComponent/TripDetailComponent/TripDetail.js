import React, { useState } from 'react';
import { View, Text, TextInput, Pressable } from 'react-native';
import * as database from '../../../../database';
import { useNavigation } from '@react-navigation/native';
import styles from './Styles'; // Import the styles from the styles.js file
import DateTimePicker from "@react-native-community/datetimepicker";

const TripDetail = ({ route }) => {
  const navigation = useNavigation();
  const { item } = route.params;
  const [editedDestination, setEditedDestination] = useState(item.destination);
  const [editedNotes, setEditedNotes] = useState(item.notes);
  const [editedTripName, setEditedTripName] = useState(item.tripName);
  const [editedTripTag, setEditedTripTag] = useState(item.tripTag);
  const [arrivalDate, setArrivalDate] = useState(new Date());
  const [departureDate, setDepartureDate] = useState(new Date());

  const handleUpdate = async () => {
    if (!item.id) {
      console.error('Invalid item ID');
      return;
    }
    const updatedData = {
      destination: editedDestination,
      notes: editedNotes,
      startDate: departureDate,
      endDate: arrivalDate,
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
        
        <View style={styles.datePickerRow}>
          <View style={styles.datePickerLabelContainer}>
            <Text style={[styles.text, styles.heading]}>Date of Departure:</Text>
          </View>
          <View style={styles.datePicker}>
            <DateTimePicker
              value={departureDate}
              mode="date"
              display="default"
              onChange={(event, date) => {
                if (event.type === 'set') {
                  setDepartureDate(date);
                }
              }}
              style={styles.dateTimePicker}
            />
          </View>
        </View>
        
        <View style={styles.datePickerRow}>
          <View style={styles.datePickerLabelContainer}>
            <Text style={[styles.text, styles.heading]}>Date of Arrival:</Text>
          </View>
          <View style={styles.datePicker}>
            <DateTimePicker
              value={arrivalDate}
              mode="date"
              display="default"
              onChange={(event, date) => {
                if (event.type === 'set') {
                  setArrivalDate(date);
                }
              }}
              style={styles.dateTimePicker}
            />
          </View>
        </View>
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
