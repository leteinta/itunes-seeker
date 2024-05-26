// Importation des bibliothèques et composants nécessaires
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Button } from 'react-native';
import HomeScreen from './screens/HomeScreen';
import ResultScreen from './screens/ResultScreen';
import FavoritesScreen from './screens/FavoritesScreen';

// Création d'un navigateur
const Stack = createStackNavigator();

// Définition des écrans et de la navigation
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={({ navigation }) => ({
          headerRight: () => (
            <Button
              onPress={() => navigation.navigate('Favorites')}
              title="Vos Favoris"
              color="#00cc00"
            />
          ),
        })} />
        <Stack.Screen name="Result" component={ResultScreen} />
        <Stack.Screen name="Favorites" component={FavoritesScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
