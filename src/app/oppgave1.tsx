import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>En app</Text>
      </View>

    
      <View style={styles.content}>
        <View style={styles.boxesRow}>
          <View style={[styles.box, styles.greenBox]} />
          <View style={[styles.box, styles.yellowBox]} />
          <View style={[styles.box, styles.blackBox]} />
        </View>

      
        <Text style={styles.meaninglessText}>Tekst som er uten mening!</Text>

  
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>OK</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#ff3b30', 
    height: '22%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: 'space-between', 
    alignItems: 'center',
    paddingBottom: 50,
  },
  boxesRow: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 20,
  },
  box: {
    width: 45,
    height: 45,
  },
  greenBox: {
    backgroundColor: '#34c759', 
    marginTop: -40,
  },
  yellowBox: {
    backgroundColor: '#ffcc00', 
    marginTop: 40,
  },
  blackBox: {
    backgroundColor: '#1c1c1e', 
    marginTop: -40,
  },
  meaninglessText: {
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
    color: '#000',
  },
  button: {
    backgroundColor: '#0051ff', 
    width: '80%',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
