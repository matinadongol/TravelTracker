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
    fontFamily:'bai',
    height: 40,
    borderColor: '#d8f5f4',
    borderWidth: 2,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 8,
  },
  updateButton: {
    backgroundColor: '#273835',
    padding: 12,
    borderRadius: 10,
    marginTop: 15,
    
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
