import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  holder: {
    flex: 1,
    backgroundColor: '#F0F0F0',
    padding:20
  },
  editDeleteButtons: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 20,
    fontFamily: 'bai',
    marginLeft:50,
    marginTop:10,
  },
  editButton: {
    width:'40%',
    backgroundColor: '#00AF22',
    padding: 10,
    borderRadius: 10,
    borderColor:'#D7F5F4',
    borderWidth:4,
    alignSelf: 'center',
  },
  editButtonText: {
    color: "white",
    fontSize: 13,
    fontWeight:'500',
    fontFamily: 'bai',
    alignSelf: 'center',
  },
  deleteButton: {
    width:'40%',
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 10,
    borderColor:'#D7F5F4',
    borderWidth:4,
    alignSelf: 'center',
  },
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: '#F0F0F0',
  },
  inputContainer: {
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: '#DBDBDB',
    marginHorizontal: 30,
    backgroundColor: 'white',
    marginTop: 2,
  },
  input: {
    // fontFamily:'Bai-Jamjuree',
    // height: 40,
    // borderColor: '#d8f5f4',
    // borderWidth: 2,
    // borderRadius: 5,
    // marginBottom: 10,
    // paddingHorizontal: 8,
    // backgroundColor: 'white'
    fontFamily:'Bai-Jamjuree',
    fontSize:16,
    color:'gray',
    padding: 10,
    textAlignVertical: 'top',
  },
  inputNotEditable: {
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: '#8D8D8D',
    marginHorizontal: 30,
    backgroundColor: '#F0F0F0',
    marginTop: 2,
  },
  textContainer: {
    marginVertical: 5
  },
  updateButton: {
    width:'30%',
    backgroundColor: '#00AF22',
    padding: 10,
    borderRadius: 10,
    borderColor:'#D7F5F4',
    borderWidth:4,
    alignItems: 'center'
  },
  weatherBtn: {
    width:'25%',
    // backgroundColor: '#21A6FC',
    padding: 5,
    borderRadius: 10,
    borderColor:'#D7F5F4',
    borderWidth:4,
    alignItems: 'center',
    justifyContent: 'flex-end',
    // margin: 'auto'
  },
  updateButtonPressed: {
    backgroundColor: '#A9C2D7',
    borderWidth: 2,
    borderColor: 'grey',
    
  },
  updateStyle: {
    alignItems: 'center',
    justifyContent:'center'
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily:'bai',
  },
  text: {
    fontFamily:'Bai-Jamjuree',
    color: 'black',
    fontSize: 16,
    fontWeight: '600',
    marginHorizontal: 30
  },
  scrollContainer: {
    justifyContent: 'space-between',
    backgroundColor: 'white',
    flexGrow: 1,
  },
  nearbyPlacesContainer:{
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  nearbyPlacesLabel:{
    fontWeight: '700',
    alignSelf:'flex-start',
    paddingLeft:20,
    marginBottom:20,
    fontSize:18,
    marginTop:30
  },
  nearbyPlacesDropdown:{
    width:'48%',
    borderRadius: 2,
    borderColor:'#D7F5F4',
    borderWidth:2,
    padding:10
  },
  nearbyPlacesHeader:{
    flexDirection:'row',
    paddingBottom:10,
    paddingTop:10
  },
  nearbyPlacesSearchContainer:{
    flexDirection:'row',
    justifyContent:'flex-start',
    alignItems:'center',
    borderColor:'#E8E8E8',
    borderBottomWidth:1,
    paddingBottom:30,
  },
  nearbyPlacesButton:{
    width:'40%',
    backgroundColor: '#273835',
    padding: 10,
    borderRadius: 10,
    borderColor:'#D7F5F4',
    borderWidth:4,
    alignSelf: 'center',
    marginLeft:10,
    alignItems:'center',
  },
  nearbyPlacesSearchText:{
    color:'white'
  },
});

export default styles;