// Importation des bibliothèques et composants nécessaires
import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, Image, Button } from 'react-native';
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
        <View style={{ padding: 20 }}>
        <FlatList
            data={favorites}
            keyExtractor={(item) => item.trackId.toString()}
            renderItem={({ item }) => (
            <View style={{ flexDirection: 'row', marginBottom: 10, alignItems: 'center' }}>
                <Image
                source={{ uri: item.artworkUrl100 }}
                style={{ width: 50, height: 50, marginRight: 10 }}
                />
                <View style={{ flex: 1 }}>
                <Text>{item.trackName} by {item.artistName}</Text>
                <Stars
                    default={item.rating}
                    count={5}
                    disabled={true}
                    half={false} // Désactive les demi-étoiles
                    starSize={24}
                    fullStar={<Icon name={'star'} style={{ color: 'gold', fontSize: 24 }} />}
                    emptyStar={<Icon name={'star-outline'} style={{ color: 'gold', fontSize: 24 }} />}
                />
                </View>
                <Button title="Supprimer" onPress={() => removeFromFavorites(item.trackId)} />
            </View>
            )}
        />
        </View>
    );
}
