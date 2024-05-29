// Importation des bibliothèques et composants nécessaires
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, Alert, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Stars from 'react-native-stars';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; // Assurez-vous d'avoir installé react-native-vector-icons

// Définition du composant ResultScreen
export default function ResultScreen({ route }) {
  const { item } = route.params;
  const [rating, setRating] = useState(0);

  // Fonction pour sauvegarder la note d'un morceau
  const saveRating = async (trackId, rating) => {
    try {
      const storedRatings = JSON.parse(await AsyncStorage.getItem('ratings')) || {};
      storedRatings[trackId] = rating;
      await AsyncStorage.setItem('ratings', JSON.stringify(storedRatings));
      Alert.alert("Success", "Note sauvegardée !");
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Échec de la sauvegarde de la note.");
    }
  };

  // Récupère la note de l'utilisateur pour ce morceau
  useEffect(() => {
    const fetchRating = async () => {
      try {
        const storedRatings = JSON.parse(await AsyncStorage.getItem('ratings')) || {};
        if (storedRatings[item.trackId]) {
          setRating(storedRatings[item.trackId]);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchRating();
  }, [item]);

  // Enregistre le morceau dans les favoris
  const saveToFavorites = async () => {
    try {
      const favorites = JSON.parse(await AsyncStorage.getItem('favorites')) || [];
      const updatedFavorites = favorites.filter(fav => fav.trackId !== item.trackId);
      updatedFavorites.push({ ...item, rating });
      await AsyncStorage.setItem('favorites', JSON.stringify(updatedFavorites));
      Alert.alert("Success", "Musique ajoutée aux favoris !");
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Échec, la musique n'a pas pu être ajoutée aux favoris.");
    }
  };

  // Rendu du composant
   return (
    <View style={styles.container}>
      <Image
        source={{ uri: item.artworkUrl100 }}
        style={styles.image}
      />
      <Text style={styles.title}>Track: {item.trackName}</Text>
      <Text style={styles.subtitle}>Artist: {item.artistName}</Text>
      <Text style={styles.subtitle}>Album: {item.collectionName}</Text>
      <Stars
        default={rating}
        count={5}
        update={(val) => {
          setRating(val);
        }}
        half={false}
        starSize={40}
        fullStar={<Icon name={'star'} style={styles.starStyle} />}
        emptyStar={<Icon name={'star-outline'} style={styles.starStyle} />}
      />
      <TouchableOpacity style={styles.button} onPress={() => saveRating(item.trackId, rating)}>
        <Text style={styles.buttonText}>Sauvegarder la Note</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={saveToFavorites}>
        <Text style={styles.buttonText}>Ajouter aux Favoris</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f8f8',
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 20,
    alignSelf: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 5,
    textAlign: 'center',
  },
  starStyle: {
    color: 'gold',
    fontSize: 40,
    marginHorizontal: 5,
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
});