import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import App from './App';
// Mocking axios.get
jest.mock('axios');

describe('App component', () => {
  test('fetches areas and items on component mount', async () => {
    const areasResponse = { data: { meals: [{ strArea: 'Area1' }, { strArea: 'Area2' }] } };
    const itemsResponse = { data: { meals: [{ idMeal: '1', strMeal: 'Meal1' }, { idMeal: '2', strMeal: 'Meal2' }] } };
    axios.get.mockResolvedValueOnce(areasResponse).mockResolvedValueOnce(itemsResponse);
    render(<App />);

    // Wait for areas and items to be fetched
    await waitFor(() => expect(axios.get).toHaveBeenCalledTimes(2));

    // Check if areas and items are rendered
    expect(screen.getByText('Area1')).toBeInTheDocument();
    expect(screen.getByText('Area2')).toBeInTheDocument();
    expect(screen.getByText('Meal1')).toBeInTheDocument();
    expect(screen.getByText('Meal2')).toBeInTheDocument();
  });

  test('changes selected area when area is selected', async () => {
    const areasResponse = { data: { meals: [{ strArea: 'Area1' }, { strArea: 'Area2' }] } };
    const itemsResponse = { data: { meals: [{ idMeal: '1', strMeal: 'Meal1' }, { idMeal: '2', strMeal: 'Meal2' }] } };
    axios.get.mockResolvedValueOnce(areasResponse).mockResolvedValueOnce(itemsResponse);
    render(<App />);

    await waitFor(() => expect(axios.get).toHaveBeenCalledTimes(2));

    // Select an area
    fireEvent.change(screen.getByLabelText('Filter By Area:'), { target: { value: 'Area2' } });

    // Check if items for selected area are rendered
    expect(screen.getByText('Meal1')).toBeInTheDocument();
    expect(screen.getByText('Meal2')).toBeInTheDocument();
  });

  test('sorts items alphabetically when "alphabetical" is selected', async () => {
    const areasResponse = { data: { meals: [{ strArea: 'Area1' }, { strArea: 'Area2' }] } };
    const itemsResponse = { data: { meals: [{ idMeal: '1', strMeal: 'B Meal' }, { idMeal: '2', strMeal: 'A Meal' }] } };
    axios.get.mockResolvedValueOnce(areasResponse).mockResolvedValueOnce(itemsResponse);
    render(<App />);

    await waitFor(() => expect(axios.get).toHaveBeenCalledTimes(2));

    // Select "alphabetical" sorting
    fireEvent.change(screen.getByLabelText('Sort By:'), { target: { value: 'alphabetical' } });

    // Check if items are sorted alphabetically
    const firstItem = screen.getByText('A Meal');
    const secondItem = screen.getByText('B Meal');
    expect(firstItem).toBeInTheDocument();
    expect(secondItem).toBeInTheDocument();
    expect(firstItem).toBeBefore(secondItem); // Custom matcher to check if firstItem appears before secondItem
  });
});