import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, Switch, ScrollView } from 'react-native';
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
  const [isChecked, setIsChecked] = useState(item.completed);

  
  const showDatePicker = (dateType) => {
    setDatePickerVisibility(true);
    setDatePickerMode(dateType);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleDateConfirm = (selectedDate) => {
    const currentDate = new Date();

    if (selectedDate < currentDate) {
      Alert.alert('Invalid Date', 'Please select a future date.');
      return;
    }
    if (datePickerMode === 'departure') {
      setDepartureDate(selectedDate);
    } else if (datePickerMode === 'arrival') {
      setArrivalDate(selectedDate);
    }
    hideDatePicker();
  };

  const [datePickerMode, setDatePickerMode] = useState(null);

  const handleUpdate = async () => {
    if (editedDestination.trim() === '') {
      Alert.alert('Please enter a valid destination.');
      return;
    }
  
    if (editedTripName.trim() === '') {
      Alert.alert('Please enter a valid occasion.');
      return;
    }

    if (editedTripTag.trim() === '') {
      Alert.alert('Error', 'Please enter a valid reason of trip.');
      return;
    }

    if (departureDate >= arrivalDate) {
      Alert.alert('Invalid Dates', 'Departure date must be before the arrival date.');
      return;
    }

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
      completed: isChecked,
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

  const handleSwitchToggle = () => {
    setIsChecked(previousState => !previousState);
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
    <View style={styles.holder}>
      <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.text}>Destination </Text>
        <View style={isInputEnabled? styles.inputContainer : styles.inputNotEditable}>
          <TextInput
            style={styles.input}
            onChangeText={setEditedDestination}
            value={editedDestination}
            editable={isInputEnabled}
          />
         </View>
        </View>
        <View style={styles.textContainer}>
        <Text style={styles.text}>From </Text>
         <View style={isInputEnabled? styles.inputContainer : styles.inputNotEditable}>
          <Pressable onPress={() => showDatePicker ('departure')} disabled={!isButtonVisible}>
            <Text style={[styles.input]}>
              {departureDate.getUTCFullYear() + "-" + (departureDate.getUTCMonth()+1) + "-" + departureDate.getUTCDate()} 
            </Text>
          </Pressable>
          </View>
          </View>
          <View style={styles.textContainer}>
          <Text style={styles.text}>To</Text>
          <View style={isInputEnabled? styles.inputContainer : styles.inputNotEditable}>
          <Pressable onPress={() => showDatePicker('arrival')} disabled={!isButtonVisible}>
            <Text style={[styles.input, styles.heading]}>
              {arrivalDate.getUTCFullYear() + "-" + (arrivalDate.getUTCMonth()+1) + "-" + arrivalDate.getUTCDate()} 
            </Text>
          </Pressable>
          </View>
          </View>
          <View style={styles.textContainer}>
          <Text style={[styles.text, styles.heading]}>Occasion </Text>
          <View style={isInputEnabled? styles.inputContainer : styles.inputNotEditable}>
          
          <TextInput
            style={styles.input}
            onChangeText={setEditedTripName}
            value={editedTripName} 
            editable={isInputEnabled}
          />
          </View>
          </View>
          <View style={styles.textContainer}>
          <Text style={[styles.text, styles.heading]}>Category </Text>
          <View style={isInputEnabled? styles.inputContainer : styles.inputNotEditable}>
          
          <TextInput
            style={styles.input}
            onChangeText={setEditedTripTag}
            value={editedTripTag}
            editable={isInputEnabled}
          />
          </View>
          </View>
          <View style={styles.textContainer}>
            <Text style={[styles.text, styles.heading]}>Notes </Text>
            <View style={isInputEnabled? styles.inputContainer : styles.inputNotEditable}>
            
              <TextInput
                style={styles.input}
                onChangeText={setEditedNotes}
                value={editedNotes}
                editable={isInputEnabled}
              />
            </View>
          </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 10,marginHorizontal: 30 }}>
          <Switch
            value={isChecked}
            onValueChange={handleSwitchToggle}
            disabled={!isInputEnabled}
          />
          <Text style={styles.text}>Completed trip</Text>
        </View>
        { !isInputEnabled && !isChecked && <View style={styles.editDeleteButtons}>
          <Pressable onPress={EditEnabled} style={styles.editButton}>
              <Text style={styles.editButtonText}>Edit</Text>
          </Pressable>
          <Pressable onPress={handleDelete} style={styles.deleteButton}>
            <Text style={styles.editButtonText}>Delete</Text>
          </Pressable> 
      </View>}
        {isButtonVisible && (
          <View style={styles.updateStyle}>
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
        )}
            
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleDateConfirm}
          onCancel={hideDatePicker}
        />
      </View>
    </View>
    </ScrollView>
  );
};

export default TripDetail;