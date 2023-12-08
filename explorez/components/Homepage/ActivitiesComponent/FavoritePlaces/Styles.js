import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    favoritePlaceContainer:{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
        margin: 5,
        borderBottomWidth: 2, 
        borderBottomColor: '#000',
        backgroundColor: '#fff'
    },
    cityName: {
        fontSize: 25,
        marginBottom: 10,
        fontWeight: '700',
        letterSpacing: 1
    },
    favoritePlaceName: {
        fontSize: 16,
        marginBottom: 5,
        fontWeight: '500'
    },
    favoritePlaceAddress: {
        fontSize: 12,
        fontWeight: '300'
    }
  });
  
  export default styles;