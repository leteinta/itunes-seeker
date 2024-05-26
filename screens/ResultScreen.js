// Importation des bibliothèques et composants nécessaires
import React, { useState, useEffect } from 'react';
import { View, Text, Button, Image, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Stars from 'react-native-stars';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; // Assurez-vous d'avoir installé react-native-vector-icons

// Définition du composant ResultScreen
export default function ResultScreen({ route }) {
  const { item } = route.params;
  const [rating, setRating] = useState(0);

  // Récupère la note de l'utilisateur pour ce morceau
  useEffect(() => {
    const fetchRating = async () => {
      try {
        const favorites = JSON.parse(await AsyncStorage.getItem('favorites')) || [];
        const foundItem = favorites.find(fav => fav.trackId === item.trackId);
        if (foundItem && foundItem.rating) {
          setRating(foundItem.rating);
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
      Alert.alert("Success", "Musique ajouter aux favoris!");
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Echec, la musique n'a pas pu être ajouter aux favoris.");
    }
  };

  // Rendu du composant
  return (
    <View style={{ padding: 20 }}>
      <Image
        source={{ uri: item.artworkUrl100 }}
        style={{ width: 100, height: 100, marginBottom: 10 }}
      />
      <Text>Track: {item.trackName}</Text>
      <Text>Artist: {item.artistName}</Text>
      <Text>Album: {item.collectionName}</Text>
      <Stars
        default={rating}
        count={5}
        update={(val) => setRating(val)}
        half={false} // Désactive les demi-étoiles
        starSize={40} // Augmente la taille des étoiles
        fullStar={<Icon name={'star'} style={{ color: 'gold', fontSize: 40 }} />}
        emptyStar={<Icon name={'star-outline'} style={{ color: 'gold', fontSize: 40 }} />}
      />
      <Button title="Ajouter aux Favoris" onPress={saveToFavorites} />
    </View>
  );
}
