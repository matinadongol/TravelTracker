import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useEffect } from 'react';
import Homepage from './components/Homepage/Homepage';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import NewTrip from './components/Homepage/ActivitiesComponent/TripsComponent/NewTrip';
import UpcomingComponent from './components/Homepage/ActivitiesComponent/UpcomingComponent/UpcomingComponent';
import TripDetail from './components/Homepage/ActivitiesComponent/UpcomingComponent/TripDetailComponent/TripDetail';
import CompletedTrips from './components/completedTrips/CompletedTrips';
import CheckCurrencyComponent from './components/Homepage/FooterComponents/CurrencyRateComponent/CheckCurrencyComponent/CheckCurrency';
import Weather from './components/Homepage/WeatherComponent/Weather';
import * as Notifications from 'expo-notifications';

const Stack = createStackNavigator();


export default function App() {
  

  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: true,
    })
  })

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
            title: 'Add New Trip',
            headerTintColor: 'white',
            headerTitleStyle: {
              fontFamily: 'bai',
              fontSize: 22,
              color: '#E6E6E6',
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
              backgroundColor: '#273835',
            },
            title: 'Trip Details', 
            headerTintColor: 'white',
            headerTitleStyle: {
              fontFamily: 'bai',
              fontSize: 22,
              color: '#E6E6E6',
            }
            }}>
          {(props) => 
            <TripDetail 
              {...props} 
              />}
        </Stack.Screen>
        <Stack.Screen name="CompletedTrips" component={CompletedTrips} 
          options={{
            headerStyle: {
              backgroundColor: '#273835',
            },
            title: 'Completed Trips', 
            headerTintColor: 'white',
            headerTitleStyle: {
              fontFamily: 'bai',
              fontSize: 22,
              color: '#E6E6E6',
            }
          }}
        />
        <Stack.Screen name="CheckCurrencyComponent" component={CheckCurrencyComponent}
        options={{
          headerStyle: {
            backgroundColor: '#273835',
          },
          title: 'Check Currency', 
          headerTintColor: 'white',
          headerTitleStyle: {
            fontFamily: 'bai',
            fontSize: 22,
            color: '#E6E6E6',
          }
        }}/>
         <Stack.Screen name="Weather" component={Weather} 
          options={{
            headerStyle: {
              backgroundColor: '#273835',
            },
            title: 'Weather', 
            headerTintColor: 'white',
            headerTitleStyle: {
              fontFamily: 'bai',
              fontSize: 22,
              color: '#E6E6E6',
            }
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