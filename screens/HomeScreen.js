// Importation des bibliothèques et composants nécessaires
import React, { useState } from 'react';
import { View, TextInput, Button, FlatList, Text, TouchableOpacity, Image } from 'react-native';
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
    <View style={{ padding: 20 }}>
      <TextInput
        placeholder="Rechercher par artiste ou titre de musique"
        value={query}
        onChangeText={setQuery}
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10 }}
      />
      <Button title="Search" onPress={search} />
      <FlatList
        data={results}
        keyExtractor={(item) => item.trackId.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate('Result', { item })}>
            <View style={{ flexDirection: 'row', marginBottom: 10, alignItems: 'center' }}>
              <Image
                source={{ uri: item.artworkUrl100 }}
                style={{ width: 50, height: 50, marginRight: 10 }}
              />
              <Text>{item.trackName} by {item.artistName}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
