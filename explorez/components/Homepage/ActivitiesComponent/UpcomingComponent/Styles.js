import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        marginTop:20,
        paddingBottom:25,
    },
    upcomingTxt:{
        fontFamily:'bai',
        fontSize:19,
        color:'black',
        marginBottom: 5
    },
    listContainer:{
        height: 350,
        paddingTop:10,
    },
    upcomingList:{
        display: 'flex',
        alignItems: 'stretch',
        justifyContent: 'space-between',
        flexDirection: 'row',
        marginBottom: 15,
        borderColor: '#d8f5f4',  
        borderWidth: 5, 
        borderRadius: 10,
        paddingHorizontal: 20,
        paddingTop:5
    },
    upcomingListDestination:{
        fontSize: 20,
        fontWeight: '500',
        marginBottom: 2,
        fontFamily: 'bai',
    },
    upcomingListStartDate:{
        fontSize: 12,
        fontFamily: 'bai',
        fontWeight: '100',
        marginBottom:5
    },
    upcomingHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
      },
    
      filterButton: {
        padding: 10,
        borderRadius: 5,
        backgroundColor: '#EFEFEF',
        marginLeft: 10,
      },
    
      // Add styles for the modal and menu buttons
      modalContainer: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
      },
      menuButton: {
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#EFEFEF',
      },
})
export default styles;