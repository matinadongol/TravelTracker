import {View, Image, Text, StyleSheet, Pressable} from "react-native"
import { useFonts } from "expo-font"
import styles from './Styles';
import { useNavigation } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { FontAwesome5 } from '@expo/vector-icons'; 

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
            <View style={styles.borderTop}></View>
            <View styles={styles.pressableContainer}>
                <Pressable onPress={handleCheckCurrencyButton} style={styles.chkCurrencyContainer}>
                    <FontAwesome5 name="money-bill-alt" size={24} color="green" />
                    <Text style={styles.checkCurrencyButton}>Currency Rate</Text>
                    <Icon name="angle-right" size={25} color="black" />
                </Pressable>
            </View>
        </View>
    )
}

export default CurrencyRateComponent