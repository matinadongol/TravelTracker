import {View, Text, StyleSheet, ScrollView} from "react-native"
import { useFonts } from "expo-font"


const UpcomingComponent = () => {
    let [fontLoaded] = useFonts({
        'bai': require('../../../../assets/fonts/BaiJamjuree-Bold.ttf')
    })

    if (!fontLoaded){
        return null
    } 

    return (
        <View style={Styles.container}>
            <Text style={Styles.upcomingTxt}>UPCOMING</Text>
            <ScrollView>
                
            </ScrollView>
        </View>
    )
}

const Styles = StyleSheet.create({
    container: {
        marginTop:20,
        paddingBottom:25,
    },
    upcomingTxt:{
        fontFamily:'bai',
        fontSize:19,
        color:'black',
        marginBottom:5
    }
})

export default UpcomingComponent