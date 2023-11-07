import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Homepage from './components/Homepage/Homepage';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import NewTrip from './components/Homepage/ActivitiesComponent/TripsComponent/NewTrip';
import UpcomingComponent from './components/Homepage/ActivitiesComponent/UpcomingComponent/UpcomingComponent';
import TripDetail from './components/Homepage/ActivitiesComponent/UpcomingComponent/TripDetailComponent/TripDetail';
import CompletedTrips from './components/completedTrips/CompletedTrips';
import CheckCurrencyComponent from './components/Homepage/FooterComponents/CurrencyRateComponent/CheckCurrencyComponent/CheckCurrency';

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
              backgroundColor: '#273835',
            },
            headerTintColor: 'white', 
            title: 'Add New Trip',
            headerTitleAlign: 'left',
            headerTitleStyle: {
              fontFamily: 'bai',
              fontSize: 25,
              color: '#E6E6E6'
            }
          }}
        />
        <Stack.Screen name="UpcomingComponent" component={UpcomingComponent} 
          options={{
            headerStyle: {
              backgroundColor: '#273835',
            },
            headerTintColor: 'white',  
          }}
        />
        <Stack.Screen name="TripDetail" 
          options={{
            headerStyle: {
              backgroundColor: '#E2F0EE',
            },
            title: 'Trip Details', 
            headerTintColor: 'white', 
            headerTitleAlign: 'left',
            headerTitleStyle: {
              fontFamily: 'bai',
              fontSize: 25,
              color: '#E6E6E6'
            },
            }}>
          {(props) => 
            <TripDetail 
              {...props} 
              />}
        </Stack.Screen>
        <Stack.Screen name="CompletedTrips" component={CompletedTrips} 
          options={{
            title: 'Completed Trips', 
            headerTintColor: 'white',
            headerTitleAlign: 'center',
            headerTitleStyle: {
              fontFamily: 'bai',
              fontSize: 25,
              color: '#E6E6E6'
            },
          }}
        />
        <Stack.Screen name="CheckCurrencyComponent" component={CheckCurrencyComponent}/>

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