import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import HeaderComponent from './components/Homepage/HeaderComponent/HeaderComponent';
import ActivitiesComponent from './components/Homepage/ActivitiesComponent/ActivitiesComponent';

export default function App() {
  return (
    <View style={styles.container}>
        <StatusBar style="auto" />
        <HeaderComponent/>
        <ActivitiesComponent>
        </ActivitiesComponent>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#273835',
  },
});
