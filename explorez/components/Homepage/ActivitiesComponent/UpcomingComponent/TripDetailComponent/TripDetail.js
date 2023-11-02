import React, { useState } from 'react';
import { View, Text, TextInput, Pressable } from 'react-native';
import * as database from '../../../../database';
import { useNavigation } from '@react-navigation/native';
import styles from './Styles';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Icon from 'react-native-vector-icons/FontAwesome5'
import { Alert } from 'react-native';

const TripDetail = ({ route }) => {
  const navigation = useNavigation();
  const { item } = route.params;
  const [editedDestination, setEditedDestination] = useState(item.destination);
  const [editedNotes, setEditedNotes] = useState(item.notes);
  const [editedTripName, setEditedTripName] = useState(item.tripName);
  const [editedTripTag, setEditedTripTag] = useState(item.tripTag);
  const [arrivalDate, setArrivalDate] = useState(new Date(item.endDate));
  const [departureDate, setDepartureDate] = useState(new Date(item.startDate));

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isInputEnabled, setIsInputEnabled] = useState(false);
  const [isButtonVisible, setIsButtonVisible] = useState(false);

  const showDatePicker = (dateType) => {
    setDatePickerVisibility(true);
    setDatePickerMode(dateType);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleDateConfirm = (selectedDate) => {
    if (datePickerMode === 'departure') {
      setDepartureDate(selectedDate);
    } else if (datePickerMode === 'arrival') {
      setArrivalDate(selectedDate);
    }
    hideDatePicker();
  };

  const [datePickerMode, setDatePickerMode] = useState(null);

  const handleUpdate = async () => {
    if (!item.id) {
      console.error('Invalid item ID');
      return;
    }
    const updatedDepartureDate = departureDate.getFullYear() + "-" + (departureDate.getMonth()+1) + "-" + (departureDate.getDate())
    const updatedArrivalDate = arrivalDate.getFullYear() + "-" + (arrivalDate.getMonth()+1) + "-" + (arrivalDate.getDate())
    const updatedData = {
      destination: editedDestination,
      notes: editedNotes,
      startDate: updatedDepartureDate,
      endDate: updatedArrivalDate,
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

  const handleDelete = () => {
    Alert.alert(
      'Delete Item',
      'Are you sure you want to delete this item?',
      [
        {
          text: 'No',
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: () => {
            database.remove(item.id);
            navigation.navigate('Homepage');
          },
        },
      ],
      { cancelable: false }
    );
  }

  const EditEnabled = () => {
    setIsInputEnabled(!isInputEnabled);
    setIsButtonVisible(!isButtonVisible)
  }

  if (!item) {
    return (
      <View style={styles.container}>
        <Text>Travel data not available</Text>
      </View>
    );
  }

  return (
    <>
    <View style={styles.editDeleteButtons}>
      <Pressable onPress={EditEnabled} style={styles.editButton}>
          <Text style={styles.editButtonText}>Edit</Text>
      </Pressable>
      <Pressable onPress={handleDelete} style={styles.deleteButton}>
      <Text style={styles.editButtonText}>Delete</Text>
      </Pressable> 
    </View>
    <View style={styles.container}>
      <Text style={styles.title}>Trip Details</Text>
      <View style={styles.inputContainer}>
        <Text style={[styles.text, styles.heading]}>Place: </Text>
        <TextInput
          style={styles.input}
          onChangeText={setEditedDestination}
          value={editedDestination}
          editable={isInputEnabled}
        />

        <Pressable onPress={() => showDatePicker ('departure')} disabled={!isButtonVisible}>
          <Text style={[styles.text, styles.heading]}>
            Departure Date: {departureDate.getUTCFullYear() + "-" + (departureDate.getUTCMonth()+1) + "-" + departureDate.getUTCDate()} 
          </Text>
        </Pressable>

        <Pressable onPress={() => showDatePicker('arrival')} disabled={!isButtonVisible}>
          <Text style={[styles.text, styles.heading]}>
            Arrival Date: {arrivalDate.getUTCFullYear() + "-" + (arrivalDate.getUTCMonth()+1) + "-" + arrivalDate.getUTCDate()} 
          </Text>
        </Pressable>

        <Text style={[styles.text, styles.heading]}>Occasion: </Text>
        <TextInput
          style={styles.input}
          onChangeText={setEditedTripName}
          value={editedTripName} 
          editable={isInputEnabled}
        />
        <Text style={[styles.text, styles.heading]}>Reason of Trip: </Text>
        <TextInput
          style={styles.input}
          onChangeText={setEditedTripTag}
          value={editedTripTag}
          editable={isInputEnabled}
        />
        <Text style={[styles.text, styles.heading]}>Additional Comments: </Text>
        <TextInput
          style={styles.input}
          onChangeText={setEditedNotes}
          value={editedNotes}
          editable={isInputEnabled}
        />
      </View>
      {isButtonVisible && (
        <Pressable
          style={({ pressed }) => [
            styles.updateButton,
            pressed ? styles.updateButtonPressed : null,
          ]}
          onPress={handleUpdate}
        >
          <Text style={styles.buttonText}>UPDATE</Text>
        </Pressable>
      )}
          
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleDateConfirm}
        onCancel={hideDatePicker}
      />
    </View>
    </>
  );
};

export default TripDetail;