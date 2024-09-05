import AsyncStorage from '@react-native-async-storage/async-storage';

// Save login status and user ID
export const saveLoginData = async (userId,userType) => {
  try {
    await AsyncStorage.setItem('isLoggedIn', JSON.stringify(true));
    await AsyncStorage.setItem('userId', JSON.stringify(userId));
    await AsyncStorage.setItem('userType', JSON.stringify(userType));

  } catch (error) {
    console.error('Error saving login data:', error);
  }
};

// Retrieve login status and user ID
export const getLoginData = async () => {
  try {
    const status = await AsyncStorage.getItem('isLoggedIn');
    const userId = await AsyncStorage.getItem('userId');
    const userType = await AsyncStorage.getItem('userType');

    return {
      isLoggedIn: status === 'true',
      userId: userId ? JSON.parse(userId) : null,
      userType: userType
    };
  } catch (error) {
    console.error('Error retrieving login data:', error);
  }
  return { isLoggedIn: false, userId: null };
};

// Clear login data (for logout)
export const clearLoginData = async () => {
  try {
    await AsyncStorage.removeItem('isLoggedIn');
    await AsyncStorage.removeItem('userId');
    await AsyncStorage.removeItem('userType');

  } catch (error) {
    console.error('Error clearing login data:', error);
  }
};
