import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container:{
        padding:20,
        backgroundColor:'#E8E8E8',
        marginBottom:20
        
    },
    containerBack:{
        padding:10,
        borderRadius: 10,
        backgroundColor:'white'
    },
    placesContainerMain:{
        display: 'flex',
        flexDirection: 'row'
    },
    placesContainer:{
        backgroundColor:'white',
        padding:15,
        borderColor:'#E8E8E8',
        borderBottomWidth:1,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    placesDescription:{
        width: 250
    },
    placeNameLabel:{
        fontWeight:'700',
        marginBottom:10,
    },
  });
  
  export default styles;