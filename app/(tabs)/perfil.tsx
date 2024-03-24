import { StyleSheet, TextInput } from 'react-native';

import { Text, View } from '@/components/Themed';

export default function TabTwoScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab Two</Text>
      <View>
        <TextInput placeholder="Primeiro Nome" style={styles.textInput} />
        <TextInput placeholder="Segundo Nome" style={styles.textInput} />
        <TextInput placeholder="Email" style={styles.textInput} />
        <TextInput placeholder='CEP' style={styles.textInput} />
        <TextInput placeholder='Rua' style={styles.textInput} />

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    overflow: 'hidden',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  textInput: {
    backgroundColor: 'white',
    color: 'tomato',
    width: '100%',
    height: 40,
    marginVertical: 5,
    borderRadius: 5,
    padding: 5,
    fontSize: 16
  }
});
