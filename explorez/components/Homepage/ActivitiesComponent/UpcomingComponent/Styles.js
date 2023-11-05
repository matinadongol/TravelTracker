import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        marginTop:20,
        paddingBottom:25,
        marginBottom: 70
    },
    upcomingTxt:{
        fontFamily:'bai',
        fontSize:25,
        color:'black',
        marginBottom: 15
    },
    upcomingList:{
        display: 'flex',
        alignItems: 'stretch',
        justifyContent: 'space-between',
        flexDirection: 'row',
        marginBottom: 25,
        borderColor: '#d8f5f4',  
        borderWidth: 5, 
        borderRadius: 10,
        padding: 20
    },
    upcomingListDestination:{
        fontSize: 25,
        fontWeight: '500',
        marginBottom: 3,
        fontFamily: 'bai',
    },
    upcomingListStartDate:{
        fontFamily: 'bai',
    }
})
export default styles;