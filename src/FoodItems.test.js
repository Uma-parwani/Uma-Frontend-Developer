import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import {axios} from 'axios';
import FoodItems from './FoodItems';

jest.mock('axios');

describe('FoodItems component', () => {
  const mockItems = [
    { idMeal: '1', strMealThumb: 'meal1.jpg', strMeal: 'Meal 1', strInstructions: 'Instructions 1' },
    { idMeal: '2', strMealThumb: 'meal2.jpg', strMeal: 'Meal 2', strInstructions: 'Instructions 2' },
  ];

  beforeEach(() => {
    axios.get.mockResolvedValue({ data: { meals: mockItems } });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders food items correctly', async () => {
    render(<FoodItems items={mockItems} />);
    const foodItems = screen.getAllByRole('img');
    expect(foodItems).toHaveLength(2);
  });

  it('opens modal with food item details when clicked', async () => {
    render(<FoodItems items={mockItems} />);
    fireEvent.click(screen.getByAltText('Meal 1'));
    await waitFor(() => {
      expect(screen.getByText('Meal 1')).toBeInTheDocument();
    //   expect(screen.getByText('Instructions 1')).toBeInTheDocument();
    });
  });

  it('closes modal when close button is clicked', async () => {
    render(<FoodItems items={mockItems} />);
    fireEvent.click(screen.getByAltText('Meal 1'));
    fireEvent.click(screen.getByText('Close'));
    await waitFor(() => {
      expect(screen.queryByText('Meal 1')).not.toBeInTheDocument();
    });
  });

  it('fetches food item details when clicked', async () => {
    render(<FoodItems items={mockItems} />);
    fireEvent.click(screen.getByAltText('Meal 1'));
    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/lookup.php?i=1');
    });
  });
});