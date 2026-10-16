import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ImageBackground } from 'react-native';
import * as Location from 'expo-location';

export default function Oppgave5() {
  const [cityInput, setCityInput] = useState('');
  const [cityName, setCityName] = useState('Henter posisjon...');
  const [weatherDescription, setWeatherDescription] = useState('Venter...');
  const [temperature, setTemperature] = useState('--°');
  const [bgImage, setBgImage] = useState('https://images.unsplash.com/photo-1534088568595-a066f410bcda?q=80&w=1000&auto=format&fit=crop');

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setCityName('Ingen tilgang til lokasjon');
        setWeatherDescription('Søk på et sted manuelt');
        return;
      }

      try {
        let location = await Location.getCurrentPositionAsync({});
        fetchWeatherByCoords(location.coords.latitude, location.coords.longitude, 'Din posisjon (GPS)');
      } catch {
        setCityName('Kunne ikke hente vær');
      }
    })();
  }, []);

  async function fetchWeatherByCoords(lat: number, lon: number, name: string) {
    try {
      const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`);
      const data = await response.json();

      if (data && data.current_weather) {
        const temp = Math.round(data.current_weather.temperature);
        setTemperature(`${temp}°`);
        setCityName(name);

        const code = data.current_weather.weathercode;
        if (code === 0) {
          setWeatherDescription('Sol og klar himmel');
          setBgImage('https://images.unsplash.com/photo-1601297183305-6df142704ea2?q=80&w=1000&auto=format&fit=crop');
        } else if (code >= 51 && code <= 67) {
          setWeatherDescription('Regn');
          setBgImage('https://images.unsplash.com/photo-1519692933481-e162a57d6721?q=80&w=1000&auto=format&fit=crop');
        } else if (code >= 71 && code <= 77) {
          setWeatherDescription('Snø');
          setBgImage('https://images.unsplash.com/photo-1483982258113-b72862e6cff6?q=80&w=1000&auto=format&fit=crop');
        } else {
          setWeatherDescription('Overskyet / Delvis skyet');
          setBgImage('https://images.unsplash.com/photo-1534088568595-a066f410bcda?q=80&w=1000&auto=format&fit=crop');
        }
      }
    } catch {
      setCityName('Feil ved henting av data');
    }
  }

  const handleSearch = async () => {
    const query = cityInput.trim();
    if (query === '') return;

    try {
      const geoResponse = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=1`);
      const geoData = await geoResponse.json();

      if (geoData && geoData.results && geoData.results.length > 0) {
        const city = geoData.results[0];
        fetchWeatherByCoords(city.latitude, city.longitude, city.name);
      } else {
        setCityName('Fant ikke stedet');
        setWeatherDescription('Prøv et annet navn');
        setTemperature('--°');
      }
    } catch {
      setCityName('Feil ved søk');
    }

    setCityInput('');
  };

  return (
    <ImageBackground source={{ uri: bgImage }} style={styles.background}>
      <View style={styles.container}>
        <View style={styles.weatherInfo}>
          <Text style={styles.cityText}>{cityName}</Text>
          <Text style={styles.descText}>{weatherDescription}</Text>
          <Text style={[styles.tempText, temperature.includes('-') && styles.freezingTemp]}>
            {temperature}
          </Text>
        </View>

        <View style={styles.searchContainer}>
          <TextInput
            style={styles.input}
            placeholder="Search any city"
            placeholderTextColor="#aaa"
            value={cityInput}
            onChangeText={setCityInput}
          />
          <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
            <Text style={styles.searchButtonText}>Søk</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 30,
    paddingVertical: 60,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  weatherInfo: {
    alignItems: 'center',
    marginTop: 100,
  },
  cityText: {
    color: '#fff',
    fontSize: 32,
    fontWeight: '300',
    textAlign: 'center',
  },
  descText: {
    color: '#ddd',
    fontSize: 18,
    marginTop: 5,
    textAlign: 'center',
  },
  tempText: {
    color: '#fff',
    fontSize: 60,
    fontWeight: '200',
    marginTop: 10,
  },
  freezingTemp: {
    color: '#ff3b30',
  },
  searchContainer: {
    width: '100%',
    alignItems: 'center',
  },
  input: {
    width: '100%',
    height: 45,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 5,
    paddingHorizontal: 15,
    color: '#fff',
    fontSize: 16,
    marginBottom: 10,
  },
  searchButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    width: '100%',
    height: 40,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});