import 'react-native-gesture-handler';
import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Provider } from 'react-redux';
import { store } from './redux/Store';
import SplashScreen from './screens/SplashScreen';
import DashboardScreen from './screens/DashboardScreen';
import HomeScreen from './screens/HomeScreen';
import MealDetails from './screens/MealDetails';
import Profile from './screens/Profile';
import AboutUs from './screens/AboutUs';
import ProfileEdit from './screens/ProfileEdit';
import Settings from './screens/Settings';
import Login from './screens/Login';
import CartScreen from './screens/CartScreen';
import HistoryScreen from './screens/History';
import { saveLoginData, getLoginData, clearLoginData } from './asyncStorage/AuthUtils'; // Import from the correct path

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

// Stack Navigator for authenticated users
const LoggedInStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Dashboard" component={DashboardScreen} />
      <Stack.Screen name="MealDetails" component={MealDetails} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="ProfileEdit" component={ProfileEdit} />
      <Stack.Screen name="Settings" component={Settings} />
      <Stack.Screen name="AboutUs" component={AboutUs} />
      <Stack.Screen name="CartScreen" component={CartScreen} />
      <Stack.Screen name="History" component={HistoryScreen} />
    </Stack.Navigator>
  );
};

// Stack Navigator for unauthenticated users
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
    </Stack.Navigator>
  );
};

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Provider store={store}>
      <NavigationContainer>
        {isLoggedIn ? (
          <Drawer.Navigator
            initialRouteName="Home"
            screenOptions={{
              drawerStyle: {
                backgroundColor: '#FFF5EE', // Background color for the drawer
                width: 240,
              },
              drawerActiveTintColor: '#FF4500', // Color of the active item
              drawerInactiveTintColor: '#000', // Color of the inactive items
              drawerLabelStyle: {
                fontSize: 16,
                fontWeight: 'bold',
              },
            }}
          >
            <Drawer.Screen name="Home" component={LoggedInStackNavigator} />
            <Drawer.Screen name="Profile" component={Profile} />
            <Drawer.Screen name="History" component={HistoryScreen} />
            <Drawer.Screen name="Cart" component={CartScreen} />
            <Drawer.Screen
              name="Logout"
              component={async () => {
                setIsLoggedIn(false);
                await clearLoginData();
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
