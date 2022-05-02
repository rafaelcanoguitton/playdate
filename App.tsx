import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Main from './src/Main';
import { NativeRouter } from 'react-router-native';
// export default function App() {
// return (
//   <View style={styles.container}>
//     <Text style={{ color: "white" }}>Open up App.tsx to start working on your app!</Text>
//     <StatusBar style="auto" />
//   </View>
// );
// }

export default function App() {
  return (<>
    <NativeRouter>
      <Main />
    </NativeRouter>
    <StatusBar style="auto" />
  </>);
}
