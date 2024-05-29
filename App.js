// Importation des bibliothèques et composants nécessaires
import React from 'react';
import { Button, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import ResultScreen from './screens/ResultScreen';
import FavoritesScreen from './screens/FavoritesScreen';

// Creation d'un navigateur
const Stack = createStackNavigator();

// Définition des écrans et de la navigation
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={({ navigation }) => ({
            title: 'Recherche iTunes',
            headerStyle: styles.header,
            headerTitleStyle: styles.headerTitle,
            headerRight: () => (
              <TouchableOpacity
                onPress={() => navigation.navigate('Favorites')}
                style={styles.headerButton}
              >
                <Text style={styles.headerButtonText}>Vos Favoris</Text>
              </TouchableOpacity>
            ),
          })}
        />
        <Stack.Screen
          name="Result"
          component={ResultScreen}
          options={{
            title: 'Détails du Résultat',
            headerStyle: styles.header,
            headerTitleStyle: styles.headerTitle,
          }}
        />
        <Stack.Screen
          name="Favorites"
          component={FavoritesScreen}
          options={{
            title: 'Vos Favoris',
            headerStyle: styles.header,
            headerTitleStyle: styles.headerTitle,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#6200ee',
  },
  headerTitle: {
    color: 'white',
    fontWeight: 'bold',
  },
  headerButton: {
    backgroundColor: '#D900ee',
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  headerButtonText: {
    color: 'white',
    fontSize: 16,
  },
});
