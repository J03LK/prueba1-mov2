// App.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import WelcomeScreen from './screens/WelcomeScreen';
import Screen1 from './screens/Screen1';

import Screen3 from './screens/Screen3';
import Screen4 from './screens/Screen4';
import { Ionicons } from '@expo/vector-icons';
import Screen2 from './screens/Screen2';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap;
          switch (route.name) {
            case 'Agregar':
              iconName = focused ? 'add-circle' : 'add-circle-outline';
              break;
            case 'Consultar':
              iconName = focused ? 'search' : 'search-outline';
              break;
            case 'Editar':
              iconName = focused ? 'create' : 'create-outline';
              break;
            case 'API':
              iconName = focused ? 'globe' : 'globe-outline';
              break;
            default:
              iconName = 'alert';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Agregar" component={Screen1} />
      <Tab.Screen name="Consultar" component={Screen2} />
      <Tab.Screen name="Editar" component={Screen3} />
      <Tab.Screen name="API" component={Screen4} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name="Welcome" 
          component={WelcomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="MainApp" 
          component={TabNavigator}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}