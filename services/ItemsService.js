
import { BASE_URL } from '../constants/Config'; // Import base URL

export const fetchItems = async () => {
    const response = await fetch(`${BASE_URL}/items`); // Double-check if `/items` is correct

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  
    const json = await response.json();
    return json; // Return fetched items
  };
