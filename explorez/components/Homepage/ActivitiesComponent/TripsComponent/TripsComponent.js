import {View, Text, StyleSheet, Pressable} from "react-native"
import { useFonts } from "expo-font"
import { useNavigation } from '@react-navigation/native';

const TripsComponent = () => {
    const navigation = useNavigation();

    let [fontLoaded] = useFonts({
        'bai': require('../../../../assets/fonts/BaiJamjuree-Bold.ttf')
    })

    if (!fontLoaded){
        return null
    } 

    const handleAddPress = () => {
        navigation.navigate('NewTrip');
    }

    return (
        <View style={Styles.container}>
            <Text style={Styles.tripsTxt}>TRIPS</Text>
            <View style={Styles.buttonsContainer}>
                <Pressable style={Styles.pressableAdd} onPress={handleAddPress}>
                    <Text style={Styles.text}>Add New</Text>
                </Pressable>
                <Pressable style={Styles.pressableComp}>
                    <Text style={Styles.text}>Completed</Text>
                </Pressable>
            </View>
        </View>
    )
}

const Styles = StyleSheet.create({
    container: {
        paddingBottom:25,
        borderBottomWidth:1,
        borderBottomColor:'#E2E2E2'
    },
    tripsTxt:{
        fontFamily:'bai',
        fontSize:19,
        color:'black',
        marginBottom:5
    },
    buttonsContainer: {
        flexDirection:"row",
        justifyContent:'space-between'
    },
    pressableAdd: {
        width:'48%',
        backgroundColor: '#00AF22',
        padding: 10,
        borderRadius: 10,
        borderColor:'#D7F5F4',
        borderWidth:4
      },
      text: {
        fontFamily:'bai',
        fontSize:16,
        color:'white',
        textAlign:'center'
      },
      pressableComp:{
        width:'48%',
        backgroundColor: '#273835',
        padding: 10,
        borderRadius: 10,
        borderColor:'#D7F5F4',
        borderWidth:4
      }
})

export default TripsComponent