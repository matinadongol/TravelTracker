import {View, Image, Text, StyleSheet} from "react-native"
import { useFonts } from "expo-font"

const HeaderComponent = () => {
    let [fontLoaded] = useFonts({
        'Bai-Jamjuree': require('../../../assets/fonts/BaiJamjuree-Regular.ttf')
    })
    if (!fontLoaded){
        return null
    } 
    return (
        <View style={Styles.container}>
            <Image source={require("../../../assets/explorezlogo.png")} style={Styles.icon} resizeMode="stretch"></Image>
            <Text style={Styles.slogan}>Exploring World Made Easy</Text>
        </View>
    )
}

const Styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        marginTop:50,
        marginBottom:35
      },
      icon: {
        width: '40%',
        height: 80,
      },
      slogan: {
        color:'#E6E6E6',
        fontSize: 16,
        fontFamily: 'Bai-Jamjuree',
        textAlign: 'center',
        marginTop:10
      },
})

export default HeaderComponent