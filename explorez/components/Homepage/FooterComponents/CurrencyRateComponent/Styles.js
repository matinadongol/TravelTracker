import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        backgroundColor: 'white',
        paddingBottom:20,
        paddingHorizontal:50
    },
    checkCurrencyButton: {
        fontSize: 16,
        borderRadius: 10,
        fontFamily: 'bai',
        color: 'black',
        marginHorizontal:10
    },
    borderTop:{
        paddingHorizontal:'38%',
        borderTopWidth:1,
        borderTopColor:'#E2E2E2'
    },
    chkCurrencyContainer:{
        marginTop:15,
        paddingVertical:10,
        flexDirection:'row',
        alignItems:'center',
    }, 
    pressableContainer:{
        flexDirection: 'row',
        justifyContent:'space-between',
        alignItems:'space-between'
    }
})
export default styles;