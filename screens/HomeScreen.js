// Importation des bibliothèques et composants nécessaires
import React, { useState } from 'react';
import { View, TextInput, StyleSheet, FlatList, Text, TouchableOpacity, Image } from 'react-native';
import axios from 'axios';

// Définition du composant HomeScreen
export default function HomeScreen({ navigation }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  // Fonction pour effectuer une recherche
  const search = () => {
    const url = `https://itunes.apple.com/search?term=${query}&entity=musicTrack&limit=25`;

    axios.get(url)
      .then(response => {
        setResults(response.data.results);
      })
      .catch(error => {
        console.error(error);
      });
  };

  // Rendu du composant
   return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Rechercher un artiste ou un titre"
        value={query}
        onChangeText={setQuery}
      />
      <TouchableOpacity style={styles.button} onPress={search}>
        <Text style={styles.buttonText}>Rechercher</Text>
      </TouchableOpacity>
      <FlatList
        data={results}
        keyExtractor={(item) => item.trackId.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.resultItem}
            onPress={() => navigation.navigate('Result', { item })}
          >
            <Image
              source={{ uri: item.artworkUrl100 }}
              style={styles.resultImage}
            />
            <View style={styles.resultTextContainer}>
              <Text style={styles.resultText}>{item.trackName}</Text>
              <Text style={styles.resultSubText}>{item.artistName}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f8f8',
  },
  input: {
    height: 40,
    borderColor: '#6200ee',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#6200ee',
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  resultItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  resultImage: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  resultTextContainer: {
    flex: 1,
  },
  resultText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  resultSubText: {
    fontSize: 14,
    color: '#888',
  },
});