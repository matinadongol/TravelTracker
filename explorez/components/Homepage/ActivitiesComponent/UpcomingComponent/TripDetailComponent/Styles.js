import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'white',
  },
  title: {
    fontFamily:'bai',
    fontSize: 34,
    fontWeight: 'bold', 
    marginBottom: 50,
  },
  inputContainer: {
    width: '100%',
  },
  input: {
    fontFamily:'Bai-Jamjuree',
    height: 40,
    borderColor: '#d8f5f4',
    borderWidth: 2,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 8,
  },
  
  updateButton: {
    width:'30%',
    backgroundColor: '#00AF22',
    padding: 10,
    borderRadius: 10,
    borderColor:'#D7F5F4',
    borderWidth:4,
    
  },
  
  updateButtonPressed: {
    backgroundColor: '#A9C2D7',
    borderWidth: 2,
    borderColor: 'grey',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily:'bai',
  },
  text: {
    fontFamily:'bai',
    color: 'black',
    fontSize: 16,
    marginBottom: 5,
    fontWeight: 'bold',
  },

});

export default styles;