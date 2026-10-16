import { useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export default function Oppgave4() {
  const [teller, setTeller] = useState(0);

  return (
    <View style={styles.container}>
      <View style={styles.buttons}>
        <View style={styles.button}>
          <Button
            title="Øk teller"
            color="#487281"
            onPress={() => setTeller(teller + 1)}
          />
        </View>

        <View style={styles.button}>
          <Button
            title="Reduser teller"
            color="#487281"
            onPress={() => {
              if (teller > 0) {
                setTeller(teller - 1);
              }
            }}
          />
        </View>
      </View>

      <View style={styles.counterContainer}>
        <Text style={styles.label}>Teller er:</Text>

        <View style={styles.counter}>
          <Text style={styles.number}>{teller}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    paddingTop: 130,
  },
  buttons: {
    width: 240,
    gap: 15,
  },
  button: {
    borderRadius: 10,
    overflow: 'hidden',
  },
  counterContainer: {
    alignItems: 'center',
    marginTop: 100,
  },
  label: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  counter: {
    width: 140,
    height: 125,
    backgroundColor: '#D8DBE2',
    justifyContent: 'center',
    alignItems: 'center',
  },
  number: {
    fontSize: 50,
    fontWeight: 'bold',
    color: '#000000',
  },
});
