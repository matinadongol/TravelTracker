import React from 'react';
import {View, StyleSheet, Text, TextInput, Button} from "react-native"
import { useState } from 'react';
import HeaderComponent from './HeaderComponent/HeaderComponent';
import ActivitiesComponent from './ActivitiesComponent/ActivitiesComponent';

const Homepage = () => {
    return (
        <View style={Styles.container}>
            <HeaderComponent/>
            <ActivitiesComponent />
        </View>
    )
}

const Styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#273835',
      },
})

export default Homepage