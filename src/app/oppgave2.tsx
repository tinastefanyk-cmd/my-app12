import { Image, StyleSheet, View } from 'react-native';

export default function App() {
  return (
      <View style={styles.container}>

        <Image
          source={{ uri: 'https://habrastorage.org/getpro/habr/upload_files/8b5/203/cb9/8b5203cb9e83e39f0a4ee2f2e78849c8.jpg' }}
          style={styles.image}
        />

        <Image
          source={require('../../assets/dog.png')}
          style={[styles.image, { marginTop: 20 }]}
        />
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 50,
  },
  borderBox: {
    borderWidth: 2,
    borderColor: '#000000', 
    padding: 20,
    alignItems: 'center',
    gap: 20, 
  },
  image: {
    padding: 20,
    width: 300,
    height: 200,
    resizeMode: 'cover',
  },
});
