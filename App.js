import 'react-native-gesture-handler';
import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import SplashScreen from './pages/SplashScreen';
import DashboardScreen from './pages/DashboardScreen';
import HomeScreen from './pages/HomeScreen';
import MealDetails from './pages/MealDetails';
import Profile from './pages/Profile';
import AboutUs from './pages/AboutUs';
import ProfileEdit from './pages/ProfileEdit';
import Settings from './pages/Settings';
import Login from './pages/Login';
import Cart from './pages/Cart';
import { Provider } from 'react-redux';
import { store } from './pages/Store';
import CartScreen from './pages/CartScreen';
import HistoryScreen from './pages/History';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

// Stack Navigator containing all the screens
const StackNavigator = ({ setIsLoggedIn }) => {
  return (
    <Stack.Navigator initialRouteName="SplashScreen">
      <Stack.Screen
        name="SplashScreen"
        component={SplashScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Login"
        component={(props) => <Login {...props} setIsLoggedIn={setIsLoggedIn} />}
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
  );
};

const LoggedInStackNavigator = ({ setIsLoggedIn }) => {
  return (
    <Stack.Navigator initialRouteName="SplashScreen">
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
       <Stack.Screen
        name="CartScreen"
        component={CartScreen}
        options={{ title: 'Cart Screen' }}
      />
      <Stack.Screen
          name="History"  // Ensure name matches the navigation call
          component={HistoryScreen}
          options={{ title: 'History' }}
        />
    </Stack.Navigator>
  );
};

// Main App Component
const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Provider store={store}>

    <NavigationContainer>
      {isLoggedIn ? (
        <Drawer.Navigator initialRouteName="Home">
          <Drawer.Screen name="Home" component={LoggedInStackNavigator} />
          <Drawer.Screen name="Profile" component={Profile} />
          <Drawer.Screen name="History" component={HistoryScreen} />
          <Drawer.Screen
            name="Logout"
            component={() => {
              setIsLoggedIn(false);
              return null;
            }}
            options={{ drawerLabel: 'Logout' }}
          />
        </Drawer.Navigator>
      ) : (
        <StackNavigator setIsLoggedIn={setIsLoggedIn} />
      )}
    </NavigationContainer>
    </Provider>
  );
};

export default App;
