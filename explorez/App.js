import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Homepage from './components/Homepage/Homepage';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import NewTrip from './components/Homepage/ActivitiesComponent/TripsComponent/NewTrip';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer style={styles.container}>
      <Stack.Navigator initialRouteName="Homepage" >
        <Stack.Screen name="Homepage" component={Homepage} 
          options={{headerShown: false}}
        />
        <Stack.Screen name="NewTrip" component={NewTrip} 
          options={{
            headerStyle: {
              backgroundColor: '#273835', // Set the background color here
            },
            headerTitle: {
            
            },
            headerTintColor: '#fff', // Set the text color here
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bgHeader: {
    backgroundColor: '#273835',
  }
});