import React from 'react';
import { render, screen } from '@testing-library/react';
import Header from './Header';

describe('Header component', () => {
  it('renders logo, title, and search input correctly', () => {
    render(<Header />);
    const logo = screen.getByAltText('Swiggy Logo');
    expect(logo).toBeInTheDocument();
    const title = screen.getByText('Food Menu App');
    expect(title).toBeInTheDocument();
    const searchInput = screen.getByPlaceholderText('Search...');
    expect(searchInput).toBeInTheDocument();
  });

  it('renders search icon correctly', () => {
    render(<Header />);
    const searchIcon = screen.getByTestId("icon");
    expect(searchIcon).toBeInTheDocument();
  });
});