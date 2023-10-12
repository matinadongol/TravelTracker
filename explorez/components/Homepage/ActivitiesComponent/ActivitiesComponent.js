import {View, StyleSheet} from "react-native"
import TripsComponent from "./TripsComponent/TripsComponent"
import OngoingComponent from "./OngoingComponent/OngoingComponent"

const ActivitiesComponent = () => {
    return (
        <View style={Styles.container}>
            <TripsComponent/>
            <OngoingComponent/>
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