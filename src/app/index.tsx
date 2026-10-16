
import { router } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text } from 'react-native';

const openTask = (task: string) => {
  router.push(`/${task}` as any);
};

export default function App() {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <Text style={styles.title}>Mine oppgaver</Text>
      <Text style={styles.subtitle}>
        React Native - Oppgaver
      </Text>

      <Pressable
        style={styles.card}
        onPress={() => openTask('oppgave1')}
      >
        <Text style={styles.cardTitle}>Oppgave 1</Text>
    
      </Pressable>

      <Pressable
        style={styles.card}
        onPress={() => openTask('oppgave2')}
      >
        <Text style={styles.cardTitle}>Oppgave 2</Text>
      </Pressable>

      <Pressable
        style={styles.card}
        onPress={() => openTask('oppgave3')}
      >
        <Text style={styles.cardTitle}>Oppgave 3</Text>
      </Pressable>

      <Pressable
        style={styles.card}
        onPress={() => openTask('oppgave4')}
      >
        <Text style={styles.cardTitle}>Oppgave 4</Text>
      </Pressable>
      
      <Pressable
        style={styles.card}
        onPress={() => openTask('oppgave5')}
      >
        <Text style={styles.cardTitle}>Oppgave 5</Text>
      </Pressable>
      
      <Pressable
        style={styles.card}
        onPress={() => openTask('oppgave6')}
      >
        <Text style={styles.cardTitle}>Oppgave 6</Text>
      </Pressable>
      
      <Pressable  
      style={styles.card}
      onPress={() => openTask('oppgave7')}
      >
        <Text style={styles.cardTitle}>Oppgave 7</Text>

      </Pressable>
      
      <Pressable
      style={styles.card}
      onPress={() => openTask('oppgave8')}
      >
        <Text style={styles.cardTitle}>Oppgave 8</Text>
      </Pressable>
    
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F0FF',
  },
  contentContainer: {
    padding: 24,
    paddingTop: 70,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#3E2A8C',
  },
  subtitle: {
    fontSize: 16,
    color: '#666666',
    marginTop: 8,
  },
  scrollHint: {
    fontSize: 14,
    color: '#666666',
    marginTop: 8,
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#FFFFFF',
    padding: 18,
    borderRadius: 14,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#E2DAF5',
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#3E2A8C',
  },
  description: {
    fontSize: 15,
    color: '#666666',
    marginTop: 5,
  },
});