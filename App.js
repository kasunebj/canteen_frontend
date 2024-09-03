import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import SplashScreen from './pages/SplashScreen';
import DashboardScreen from './pages/DashboardScreen';
import HomeScreen from './pages/HomeScreen';
import MealDetails from './pages/MealDetails';
import Profile from './pages/Profile';
import AboutUs from './pages/AboutUs';
import ProfileEdit from './pages/ProfileEdit';
import Settings from './pages/Settings';
import Login from './pages/Login'; // Import Login page

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SplashScreen">
        <Stack.Screen
          name="SplashScreen"
          component={SplashScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={Login} // Add Login screen
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Dashboard"
          component={DashboardScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="MealDetails"
          component={MealDetails}
          options={{ title: 'Meal Details' }}
        />
        <Stack.Screen
          name="Profile"
          component={Profile}
          options={{ title: 'Profile' }}
        />
        <Stack.Screen
          name="ProfileEdit"
          component={ProfileEdit}
          options={{ title: 'Edit Profile' }}
        />
        <Stack.Screen
          name="Settings"
          component={Settings}
          options={{ title: 'Settings' }}
        />
        <Stack.Screen
          name="AboutUs"
          component={AboutUs}
          options={{ title: 'About Us' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
