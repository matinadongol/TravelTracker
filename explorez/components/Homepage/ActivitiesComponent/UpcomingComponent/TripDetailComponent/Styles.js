import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  holder: {
    flex: 1,
    backgroundColor: '#E2F0EE',
  },
  editDeleteButtons: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    padding: 20,
    marginHorizontal: 50,
    fontFamily: 'bai'
  },
  editButton: {
    backgroundColor: '#00AF22',
    width: 100,
    padding: 5,
    alignItems: 'center',
    borderRadius: 10,

  },
  editButtonText: {
    color: "white",
    fontSize: 16,
    fontFamily: 'bai'
  },
  deleteButton: {
    backgroundColor: '#FC2121',
    width: 100,
    padding: 5,
    alignItems: 'center',
    borderRadius: 10,
   
  },
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    padding: 16,
    backgroundColor: '#E2F0EE',
  },
  inputContainer: {
    borderRadius: 30,
    borderWidth: 0.5,
    borderColor: '#DBDBDB',
    marginHorizontal: 30,
    backgroundColor: 'white',
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
    borderRadius: 30,
    borderWidth: 0.5,
    borderColor: '#DBDBDB',
    marginHorizontal: 30,
    backgroundColor: 'E2F0EE'
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
});

export default styles;