import {View, Image, Text, StyleSheet, Pressable} from "react-native"
import { useFonts } from "expo-font"
import styles from './Styles';
import { useNavigation } from '@react-navigation/native'

const CurrencyRateComponent = () => {
    const navigation = useNavigation();
    let [fontLoaded] = useFonts({
        'bai': require('../../../../assets/fonts/BaiJamjuree-Regular.ttf')
    })
    if (!fontLoaded){
        return null
    } 
    const handleCheckCurrencyButton = () => {
        navigation.navigate('CheckCurrencyComponent')
    }
    return (
        <View style={styles.container}>
            <Pressable onPress={handleCheckCurrencyButton}>
                <Text style={styles.checkCurrencyButton}>Currency Rate</Text>
            </Pressable>
        </View>
    )
}

export default CurrencyRateComponent