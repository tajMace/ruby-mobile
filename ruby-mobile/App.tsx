import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context'
import CalendarScreen from './src/screens/CalendarScreen';

export default function App() {
  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <CalendarScreen />
        <StatusBar style="auto" />
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
