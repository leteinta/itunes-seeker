// Importation des bibliothèques et composants nécessaires
import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Stars from 'react-native-stars';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// Définition du composant FavoritesScreen
export default function FavoritesScreen({ navigation }) {
    const [favorites, setFavorites] = useState([]);

    // Récupère les favoris de l'utilisateur
    useEffect(() => {
        const fetchFavorites = async () => {
        try {
            const storedFavorites = JSON.parse(await AsyncStorage.getItem('favorites')) || [];
            setFavorites(storedFavorites);
        } catch (error) {
            console.error(error);
        }
        };

        const unsubscribe = navigation.addListener('focus', fetchFavorites);
        return unsubscribe;
    }, [navigation]);

        // Supprime un morceau des favoris
    const removeFromFavorites = async (trackId) => {
        try {
        const updatedFavorites = favorites.filter(fav => fav.trackId !== trackId);
        await AsyncStorage.setItem('favorites', JSON.stringify(updatedFavorites));
        setFavorites(updatedFavorites);
        } catch (error) {
        console.error(error);
        }
    };

    // Rendu du composant
    return (
    <View style={styles.container}>
      <FlatList
        data={favorites}
        keyExtractor={(item) => item.trackId.toString()}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Image
              source={{ uri: item.artworkUrl100 }}
              style={styles.image}
            />
            <View style={styles.infoContainer}>
              <Text style={styles.trackName}>{item.trackName} by {item.artistName}</Text>
              <Stars
                default={item.rating}
                count={5}
                disabled={true}
                half={false}
                starSize={24}
                fullStar={<Icon name={'star'} style={styles.starStyle} />}
                emptyStar={<Icon name={'star-outline'} style={styles.starStyle} />}
              />
            </View>
            <TouchableOpacity style={styles.button} onPress={() => removeFromFavorites(item.trackId)}>
              <Text style={styles.buttonText}>Supprimer</Text>
            </TouchableOpacity>
          </View>
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
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  image: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  infoContainer: {
    flex: 1,
  },
  trackName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  starStyle: {
    color: 'gold',
    fontSize: 24,
  },
  button: {
    backgroundColor: '#6200ee',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 14,
  },
});