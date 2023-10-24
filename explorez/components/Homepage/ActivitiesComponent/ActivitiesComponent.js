import {View, StyleSheet} from "react-native"
import TripsComponent from "./TripsComponent/TripsComponent"
import UpcomingComponent from "./UpcomingComponent/UpcomingComponent"
import TripDetail from "./UpcomingComponent/TripDetailComponent/TripDetail"
import NewTrip from "./TripsComponent/NewTrip"
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const ActivitiesComponent = () => {
    return (
        <View style={Styles.container}>
            <TripsComponent/>
            <UpcomingComponent/>
        </View>
    )
}

const Styles = StyleSheet.create({
    container: {
        flex:1,
        padding:50,
        backgroundColor:'#fff',
        borderTopLeftRadius:50,
        borderTopRightRadius:50
      },
})

export default ActivitiesComponent