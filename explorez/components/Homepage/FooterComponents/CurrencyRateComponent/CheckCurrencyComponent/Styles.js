import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#fff'
    },
    fromAndToSection: {
        display: 'flex',
        width: '100%',
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    labelName: {
        fontSize: 18,
        marginBottom: 10
    },
    currencyInputSection: {
        fontSize: 20,
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 4,
        color: 'black',
        paddingRight: 30,
        width: 150
    },
    exchangeButton: {
        backgroundColor: '#00AF22',
        width: 150,
        paddingHorizontal: 10,
        paddingVertical: 20,
        borderRadius: 10,
        alignItems: 'center',
        marginVertical: 50,
    },
    convertedResult: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    exchangeButtonText:{
        color: '#fff',
        fontSize: 18
    },
    exchangeRate:{
        fontSize: 25,
        backgroundColor: '#fff',
        padding: 20,
        marginTop: 20,
        borderWidth: 1,
        borderRadius: 10,
        marginBottom: 20,
    },
    previousExchangeContainer:{
        display: 'flex',
        alignItems: 'center'
    },
    previousExchangeHeading: {
        marginBottom: 20,
    },
    previousExchangeView:{
        backgroundColor:'white',
        padding:15,
        borderColor:'#E8E8E8',
        borderBottomWidth:1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    previousExchangeRate:{
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10
    },
    previousExchangeDate:{
        fontSize: 14,
        fontWeight: 'light'
    }
    
})
export default styles;