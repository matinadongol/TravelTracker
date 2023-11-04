import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Homepage from './components/Homepage/Homepage';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import NewTrip from './components/Homepage/ActivitiesComponent/TripsComponent/NewTrip';
import UpcomingComponent from './components/Homepage/ActivitiesComponent/UpcomingComponent/UpcomingComponent';
import TripDetail from './components/Homepage/ActivitiesComponent/UpcomingComponent/TripDetailComponent/TripDetail';
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
            headerTintColor: '#fff', 
            title: 'New Trip'
          }}
        />
        <Stack.Screen name="UpcomingComponent" component={UpcomingComponent} 
          options={{
            headerStyle: {
              backgroundColor: '#273835',
            },
            headerTintColor: '#fff', 
          }}
        />
        <Stack.Screen name="TripDetail" options={{headerStyle: {
              backgroundColor: '#273835',
            },title: 'Edit Trip', headerTintColor: '#fff',}}>
          {(props) => <TripDetail {...props} />}
        </Stack.Screen>
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