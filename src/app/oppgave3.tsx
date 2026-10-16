import { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

export default function ExploreScreen() {
  const [passord, setPassord] = useState('');

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Passord</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.label}>Skriv inn passordet ditt:</Text>

        <TextInput
          style={styles.input}
          value={passord}
          onChangeText={setPassord}
        />

        <Text style={styles.passwordLabel}>Passordet ditt er:</Text>

        <Text style={styles.password}>{passord}</Text>

        {passord.length >0 && passord.length < 5 && (
          <Text style={styles.warning}>
            Passordet må minst ha 5 tegn
          </Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  header: {
    height: 105,
    backgroundColor: '#373F51',
    justifyContent: 'center',
    alignItems: 'center',
  },

  headerText: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: 'bold',
  },

  content: {
    padding: 30,
  },

  label: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },

  input: {
    height: 45,
    borderWidth: 2,
    borderColor: '#999999',
    marginBottom: 45,
    paddingHorizontal: 10,
    fontSize: 18,
  },

  passwordLabel: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },

  password: {
    fontSize: 18,
    minHeight: 30,
  },

  warning: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 190,
  },
});
