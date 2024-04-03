import React, { useState } from 'react';
import axios from 'axios';
import Modal from 'react-modal';

function FoodItems({ items }) {
  const [selectedFoodItem, setSelectedFoodItem] = useState(null);

  const openModal = (foodItem) => {
    axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${foodItem.idMeal}`)
      .then(response => {
        setSelectedFoodItem(response.data.meals[0]);
      })
      .catch(error => {
        console.error('Error fetching food item details:', error);
      });
  };

  const closeModal = () => {
    setSelectedFoodItem(null);
  };

  return (
    <div className="food-items">
      {items.map(item => (
        <div key={item.idMeal} className="food-item" onClick={() => openModal(item)}>
          <img src={item.strMealThumb} alt={item.strMeal} />
          <h3>{item.strMeal}</h3>
          <p>Rating: {Math.floor(Math.random() * 5) + 1}</p>
        </div>
      ))}
     <Modal
      isOpen={selectedFoodItem !== null}
      onRequestClose={closeModal}
      contentLabel="Food Item Details"
      className="modal"
      overlayClassName="overlay"
      >
        {selectedFoodItem && (
          
          <div className="flex">
            <div className="w-1/2">
              <img src={selectedFoodItem.strMealThumb} alt={selectedFoodItem.strMeal} className="w-full h-full object-cover" />
            </div>
            <div className="w-1/2 p-4">
              <h2 className="text-xl font-bold mb-2">{selectedFoodItem.strMeal}</h2>
              <p>{selectedFoodItem.strInstructions}</p>
              <button onClick={closeModal} className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Close</button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}

export default FoodItems;
