import React, {useEffect} from 'react';
import {View, StyleSheet, Text, TextInput, Pressable, ActivityIndicator, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard} from "react-native"
import {Picker} from '@react-native-picker/picker';
import * as database from '../../../database';
import { useState } from 'react';
import DateTimePicker from "@react-native-community/datetimepicker";

const NewTrip = () => {
    const today = new Date();

    const [loading, setLoading] = useState(false);
    const [tripName, setTripName] = useState('');
    
    const [destination, setDestination] = useState('');
    const [tripTag, setTripTag] = useState("Leisure");
    const [notes, setNotes] = useState('');
    const [containerStyle, setContainerStyle] = useState(Styles.container);
    const [isTextInputFocused, setIsTextInputFocused] = useState(false);
    const [startDate, setStartDate] = useState(new Date(today.getFullYear(), today.getMonth(), today.getDate()));
    const [endDate, setEndDate] = useState(new Date(today.getFullYear(), today.getMonth(), today.getDate()));
    const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);
    
    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener(
          'keyboardDidShow',
          () => {
            if(isTextInputFocused) {
                setContainerStyle({ ...Styles.container, justifyContent: 'flex-end' });
            }
            
          }
        );
        const keyboardDidHideListener = Keyboard.addListener(
          'keyboardDidHide',
          () => {
            setContainerStyle(Styles.container);
          }
        );
    
        return () => {
          keyboardDidShowListener.remove();
          keyboardDidHideListener.remove();
        };
      }, [isTextInputFocused]);

    const handleFocus = () => {
        setIsTextInputFocused(true);
    }

    const handleBlur = () => {
        setIsTextInputFocused(false);
      };

    const handleSubmit = async () => {
        try{
            setLoading(true);

            if (!tripName || !startDate || !destination) {
                alert('Please fill in all the required fields');
                return;
            }

            const data = {
                tripName,
                startDate,
                endDate,
                destination,
                tripTag,
                notes,
            }
    
            const id = await database.save(data)
        } catch (error) {
            console.error('Error adding document: ', error);
        } finally {
            setLoading(false);
        }
    }

    const handleStartDateChange = (event, selectedDate) => {
        setShowStartPicker(false);
        const dateObject = new Date(selectedDate);
        if (selectedDate !== undefined) {
            const month = selectedDate.getMonth() + 1; // Months are zero-indexed
            const day = selectedDate.getDate();
            const year = selectedDate.getFullYear();
            const date = year+ "-" + month + "-"  + day
            setStartDate(date.toString());
        }
    };
    
    const showStartDatePicker = () => {
        setShowStartPicker(true);
      };
    
      const showEndDatePicker = () => {
        setShowEndPicker(true);
      };

    const handleEndDateChange = (event, selectedDate) => {
        setShowEndPicker(false);
    
        if (selectedDate !== undefined) {
            const month = selectedDate.getMonth() + 1; 
            const day = selectedDate.getDate();
            const year = selectedDate.getFullYear();
            const date = year+ "-" + month + "-"  + day
            setEndDate(date.toString());
        }
      };
    

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={Styles.container}
            >
        <View style={containerStyle}>
            <View style={Styles.inputContainer}>
                <TextInput
                    placeholder="Trip Name *"
                    onChangeText={text => setTripName(text)}
                    value={tripName}
                    style={Styles.inputText}
                />
            </View>
            <View style={Styles.inputContainer}>
                <TextInput
                    placeholder="Start Date *"
                    value={startDate.toString()}
                    style={Styles.inputText}
                    onFocus={showStartDatePicker}
                />
                {showStartPicker && (
                    <DateTimePicker
                        value={startDate}
                        mode="date"
                        display="default"
                        onChange={handleStartDateChange}
                    />)}
            </View>
            <View style={Styles.inputContainer}>
                <TextInput
                    placeholder="End Date"
                    value={endDate.toString()}
                    style={Styles.inputText}
                    onFocus={showEndDatePicker}
                />
                {showEndPicker && (
                    <DateTimePicker
                        // testID="dateTimePicker"
                        value={endDate}
                        mode="date"
                        display="default"
                        onChange={handleEndDateChange}
                    />)}
            </View>
            <View style={Styles.inputContainer}>
                <TextInput
                    placeholder="Destination *"
                    onChangeText={text => setDestination(text)}
                    value={destination}
                    style={Styles.inputText}
                />
            </View>
            <View style={Styles.inputContainer}>
                <Picker
                    selectedValue={tripTag}
                    onValueChange={(itemValue, itemIndex) => setTripTag(itemValue)}
                >
                <Picker.Item label="Leisure" value="Leisure" />
                <Picker.Item label="Business" value="Business" />
            </Picker>
            </View>
            <View style={Styles.inputContainer}>
                <TextInput
                    placeholder="Enter your notes here"
                    onChangeText={text => setNotes(text)}
                    value={notes}
                    multiline={true}
                    numberOfLines={5}
                    style={Styles.inputText}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                />
            </View>
            <Pressable style={Styles.addBtn} onPress={handleSubmit} >
                <Text style={Styles.text}>ADD</Text>
            </Pressable>
            { loading && (
                <View style={Styles.overlay}>
                    <ActivityIndicator size="large" color="#0000ff" />
                </View>)
            }
        </View>
        </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
    )
}

const Styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    addBtn: {
        width:'30%',
        backgroundColor: '#00AF22',
        padding: 10,
        borderRadius: 10,
        borderColor:'#D7F5F4',
        borderWidth:4,
        alignSelf: 'center'
    },
    text: {
        fontFamily:'bai',
        fontSize:16,
        color:'white',
        textAlign:'center',
    },
    inputText: {
        fontFamily:'Bai-Jamjuree',
        fontSize:16,
        color:'gray',
        padding: 10,
        margin: 5,
    },
    inputContainer: {
        borderRadius: 10,
        borderWidth: 0.5,
        borderColor: '#DBDBDB',
        margin: 10
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(255,255,255,0.7)',
        justifyContent: 'center',
        alignItems: 'center',
    },
})

export default NewTrip