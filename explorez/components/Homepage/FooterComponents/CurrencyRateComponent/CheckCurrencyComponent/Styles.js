import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        marginTop: 50,
        backgroundColor: 'white'
    },
    fromAndToSection: {
        display: 'flex',
        width: '100%',
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingHorizontal: 30,
        paddingVertical: 10,
    },
    labelName: {
        fontSize: 18
    },
    currencyInputSection: {
        fontSize: 16,
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
        marginVertical: 100
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
        marginTop: 10,
        borderWidth: 1,
        borderRadius: 10
    }
})
export default styles;