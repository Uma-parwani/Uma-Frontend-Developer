import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Styles/styles.css'
import Header from './Header';
import Filters from './Filters';
import FoodItems from './FoodItems';
import Footer from './Footer';
import Pagination from './Pagination';


const App = () => {
  const [areas, setAreas] = useState([]);
  const [selectedArea, setSelectedArea] = useState("Indian");
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchAreas = async () => {
      try {
        const response = await axios.get('https://www.themealdb.com/api/json/v1/1/list.php?a=list');
        setAreas(response.data.meals.map((meal) => meal.strArea));
      } catch (error) {
        console.error('Error fetching areas:', error);
      }
    };

    fetchAreas();
  }, []);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${selectedArea}`);
        setItems(response.data.meals);
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    };

    fetchItems();
  }, [selectedArea]);

  const handleAreaChange = (e) => {
    setSelectedArea(e.target.value);
  };

  const handleSortChange = (sortBy) => {
    let sortedItems = [...items];
    if (sortBy === 'alphabetical') {
      sortedItems.sort((a, b) => a.strMeal.localeCompare(b.strMeal));
      setItems(sortedItems);
    }
  };

  return (
    <div className=' flex flex-col min-h-screen'>
      <div className='flex-grow mb-5'>
      <Header />
      <Filters areas={areas} handleAreaChange={handleAreaChange} handleSortChange={handleSortChange} />
      <FoodItems items={items} />
      </div>
      <div className='flex justify-center items-center mb-5'>
      <Pagination/>
      </div>
      <Footer />
    </div>
  );
};

export default App;
