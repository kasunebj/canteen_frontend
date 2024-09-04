import React, { useState,useEffect  } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList, Modal,Button } from 'react-native';
import { addItem } from './CartSlice';
import { useDispatch } from 'react-redux';

const foodItems = [
  {
    id: '1',
    name: 'Food Item 1',
    price: '$9.99',
    ingredients: 'Ingredient 1, Ingredient 2, Ingredient 3',
    image: require('../assets/food1.png'), // Assuming 'food1.png' is in the assets folder
  },
  {
    id: '4',
    name: 'Food Item 4',
    price: '$9.99',
    ingredients: 'Ingredient 1, Ingredient 2, Ingredient 3',
    image: require('../assets/food4.png'), // Assuming 'food1.jpg' is in the assets folder
  },
  {
    id: '5',
    name: 'Food Item 5',
    price: '$9.99',
    ingredients: 'Ingredient 1, Ingredient 2, Ingredient 3',
    image: require('../assets/food5.png'), // Assuming 'food1.jpg' is in the assets folder
  },
  {
    id: '6',
    name: 'Food Item 6',
    price: '$9.99',
    ingredients: 'Ingredient 1, Ingredient 2, Ingredient 3',
    image: require('../assets/food6.png'), // Assuming 'food1.jpg' is in the assets folder
  },
  {
    id: '7',
    name: 'Food Item 7',
    price: '$9.99',
    ingredients: 'Ingredient 1, Ingredient 2, Ingredient 3',
    image: require('../assets/food11.png'), // Assuming 'food1.jpg' is in the assets folder
  },
  {
    id: '8',
    name: 'Food Item 8',
    price: '$9.99',
    ingredients: 'Ingredient 1, Ingredient 2, Ingredient 3',
    image: require('../assets/food8.png'), // Assuming 'food1.jpg' is in the assets folder
  },
  {
    id: '9',
    name: 'Food Item 9',
    price: '$9.99',
    ingredients: 'Ingredient 1, Ingredient 2, Ingredient 3',
    image: require('../assets/food9.png'), // Assuming 'food1.jpg' is in the assets folder
  },
  {
    id: '10',
    name: 'Food Item 10',
    price: '$9.99',
    ingredients: 'Ingredient 1, Ingredient 2, Ingredient 3',
    image: require('../assets/food10.png'), // Assuming 'food1.jpg' is in the assets folder
  },
  {
    id: '2',
    name: 'Food Item 2',
    price: '$12.99',
    ingredients: 'Ingredient 1, Ingredient 2, Ingredient 3',
    image: require('../assets/food2.png'), // Assuming 'food2.jpg' is in the assets folder
  },
  {
    id: '4',
    name: 'Food Item 4',
    price: '$9.99',
    ingredients: 'Ingredient 1, Ingredient 2, Ingredient 3',
    image: require('../assets/food4.png'), // Assuming 'food4.png' is in the assets folder
  },
  // Add other food items similarly
];

const HomeScreen = ({ navigation }) => {
  const [selectedFood, setSelectedFood] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [itemList, setItemList] = useState(false);

  const dispatch = useDispatch();

  const handleAddToCart = (item) => {
    alert(item);
    dispatch(addItem(item));
  };

//   useEffect(() => {
//     // Call to backend API
//     const fetchData = async () => {
//         try {
//             console.log("inside")
//             const response = await fetch('http://localhost:8080/items');
//             const json = response.json();
//             setitemList(json);
//         } catch (error) {
//             console.error("Error fetching data: ", error);
//         } finally {
//             setLoading(false);
//         }
//     };

//     fetchData();
// }, []);

useEffect(() => {
  const fetchData = async () => {
      try {
          console.log("inside");
          const response = await fetch('http://192.168.1.100:8080/items');

          if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
          }

          const json = await response.json();
          console.log(json)
          setItemList(json);
      } catch (error) {
          console.error("Error fetching data: ", error);
      // } finally {
      //     setLoading(false);
      // }
      }
  };

  fetchData();
}, []);


  const renderFoodItem = ({ item }) => (
    <TouchableOpacity
      style={styles.foodItem}
      onPress={() => {
        setSelectedFood(item);
        setModalVisible(true);
      }}
    >
      <Image source={item.image} style={styles.foodImage} />
      <Text style={styles.foodName}>{item.name}</Text>
      <Text style={styles.foodPrice}>{item.price}</Text>
      <Button title="Add to Cart" onPress={() => handleAddToCart(item)} />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.welcomeText}>Welcome</Text>
        <TouchableOpacity
          style={styles.profileButton}
          onPress={() => navigation.navigate('CartScreen')}
        >
          <Text style={styles.profileButtonText}>Cart</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.profileButton}
          onPress={() => navigation.navigate('Profile')}
        >
          <Text style={styles.profileButtonText}>Profile</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.main}>
        <Text style={styles.title}>Today Available</Text>
        <FlatList
          data={itemList}
          renderItem={renderFoodItem}
          keyExtractor={(item) => item.id}
          numColumns={2}
          contentContainerStyle={styles.foodContainer}
        />
      </View>
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => navigation.navigate('MealDetails')}
        >
          <Text style={styles.navButtonText}>Meal Details</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => navigation.navigate('Dashboard')}
        >
          <Text style={styles.navButtonText}>Dashboard</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => navigation.navigate('AboutUs')}
        >
          <Text style={styles.navButtonText}>About Us</Text>
        </TouchableOpacity>
      </View>

      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {selectedFood && (
              <>
                <Image source={selectedFood.image} style={styles.modalImage} />
                <Text style={styles.modalFoodName}>{selectedFood.name}</Text>
                <Text style={styles.modalIngredients}>{selectedFood.description}</Text>
                <Text style={styles.modalFoodPrice}>{selectedFood.price}</Text>
                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={styles.closeButtonText}>Close</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF5EE', // Seashell color
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#FF4500', // OrangeRed color
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF',
  },
  profileButton: {
    padding: 8,
    backgroundColor: '#FFA07A', // LightSalmon color
    borderRadius: 4,
  },
  profileButtonText: {
    color: '#FFF',
    fontSize: 16,
  },
  main: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  foodContainer: {
    justifyContent: 'space-around',
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  foodItem: {
    alignItems: 'center',
    marginBottom: 16,
    marginHorizontal: 8,
    backgroundColor: '#FFA07A', // LightSalmon color
    borderRadius: 8,
    padding: 8,
    width: '45%', // Adjust as per your design
  },
  foodImage: {
    width: '100%',
    height: 120,
    borderRadius: 8,
    marginBottom: 8,
  },
  foodName: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  foodPrice: {
    fontSize: 14,
    color: '#888',
    textAlign: 'center',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#FF6347', // Tomato color
  },
  navButton: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
    marginHorizontal: 5,
    backgroundColor: '#FFA07A', // LightSalmon color
    borderRadius: 4,
  },
  navButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#FFF',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
  },
  modalImage: {
    width: '100%',
    height: 150,
    borderRadius: 8,
    marginBottom: 16,
  },
  modalFoodName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  modalIngredients: {
    fontSize: 16,
    color: '#333',
    marginBottom: 8,
    textAlign: 'center',
  },
  modalFoodPrice: {
    fontSize: 18,
    color: '#FF4500',
    marginBottom: 16,
    textAlign: 'center',
  },
  closeButton: {
    backgroundColor: '#FF4500', // OrangeRed color
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
  },
  closeButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
