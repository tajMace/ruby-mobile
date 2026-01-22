import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import CalendarScreen from './src/screens/CalendarScreen';

export default function App() {
  return (
    <View style={styles.container}>
      <CalendarScreen />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
