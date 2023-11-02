import React, {useEffect} from 'react';
import {View, StyleSheet, Text, TextInput, Pressable, ActivityIndicator, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, Alert} from "react-native"
import {Picker} from '@react-native-picker/picker';
import * as database from '../../../database';
import { useState, useRef } from 'react';
import { useNavigation } from '@react-navigation/native';
import DateTimePicker from "@react-native-community/datetimepicker";
import {
    actions,
    RichEditor,
    RichToolbar,
  } from "react-native-pell-rich-editor";

const NewTrip = () => {
  const richText = useRef();
  const navigation = useNavigation();
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [descHTML, setDescHTML] = useState("");
  const [showDescError, setShowDescError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [tripName, setTripName] = useState('');
  const [destination, setDestination] = useState('');
  const [tripTag, setTripTag] = useState("Leisure");
  const [notes, setNotes] = useState('');
  const [containerStyle, setContainerStyle] = useState(Styles.container);
  const [isTextInputFocused, setIsTextInputFocused] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);
    
    useEffect(() => {
      const keyboardDidShowListener = Keyboard.addListener(
        'keyboardDidShow',
        () => {
          if(isTextInputFocused) {
              setContainerStyle({ ...Styles.container, justifyContent: 'flex-end', marginBottom: 50 });
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

    const handleStartDateChange = (event, selectedDate) => {
        setShowStartPicker(false);
        
        const dateObject = new Date(selectedDate);
        if (selectedDate !== undefined) {
            const month = selectedDate.getMonth() + 1;
            const day = selectedDate.getDate();
            const year = selectedDate.getFullYear();
            const date = year+ "-" + month + "-"  + day
            setStartDate(date.toString());
        }
    };
    
    const showStartDatePicker = () => {
        setShowStartPicker(true);
        setStartDate(new Date());
      };
    
    const showEndDatePicker = () => {
      setShowEndPicker(true);
      setEndDate(new Date());
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
    
    const handleFocus = () => {
      setIsTextInputFocused(true);
  }

  const handleBlur = () => {
      setIsTextInputFocused(false);
    };

    const richTextHandle = (descriptionText) => {
      if (descriptionText) {
        setShowDescError(false);
        setDescHTML(descriptionText);
      } else {
        setShowDescError(true);
        setDescHTML("");
      }
    };

    const handleSubmit = async () => {
      const replaceHTML = descHTML.replace(/<(.|\n)*?>/g, "").trim();
      const replaceWhiteSpace = replaceHTML.replace(/&nbsp;/g, "").trim();
      setNotes(replaceWhiteSpace)

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
          setShowSuccessAlert(true);
          
      } catch (error) {
          console.error('Error adding document: ', error);
      } finally {
          setLoading(false);
          
      }
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={Styles.container}
            >
        <View style={containerStyle}>
        {showSuccessAlert && (
        Alert.alert(
          'Success',
          'Trip added successfully!',
          [{ text: 'OK', onPress: () => navigation.navigate('Homepage') }]
        )
      )}
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
              <RichEditor
                ref={richText}
                onChange={richTextHandle}
                placeholder="Enter your notes here."
                androidHardwareAccelerationDisabled={true}
                style={Styles.richTextEditorStyle}
                initialHeight={250}
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
              <RichToolbar
                editor={richText}
                selectedIconTint="#873c1e"
                iconTint="#312921"
                actions={[
                  actions.checkboxList,
                ]}
                style={Styles.richTextToolbarStyle}
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
        backgroundColor: '#E2F0EE'
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
        textAlignVertical: 'top'
    },
    inputContainer: {
        borderRadius: 10,
        borderWidth: 0.5,
        borderColor: '#DBDBDB',
        margin: 10,
        marginHorizontal: 30,
        backgroundColor: 'white'
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(255,255,255,0.7)',
        justifyContent: 'center',
        alignItems: 'center',
    },

  richTextEditorStyle: {
    fontFamily:'Bai-Jamjuree',
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderWidth: 0.5,
    borderColor: '#DBDBDB',
  },

  richTextToolbarStyle: {
    backgroundColor: "#c6c3b3",
    borderColor: "#c6c3b3",
    borderBottomEndRadius: 10,
    borderBottomLeftRadius: 10
  },
})

export default NewTrip