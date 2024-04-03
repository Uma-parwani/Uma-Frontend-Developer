import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Filters from './Filters';

describe('Filters component', () => {
  const areas = ['Area 1', 'Area 2', 'Area 3'];
  const handleAreaChange = jest.fn();
  const handleSortChange = jest.fn();

  it('should render filter by area options correctly', () => {
    render(
      <Filters areas={areas} handleAreaChange={handleAreaChange} handleSortChange={handleSortChange} />
    );

    const selectElement = screen.getByText('Filter By Area:');
    expect(selectElement).toBeInTheDocument(  );

    areas.forEach((area) => {
      const correctArea=screen.getByText(area)
      expect(correctArea).toBeInTheDocument();
    });
  });

  it('should call handleAreaChange when area selection is changed', () => {
    render(
      <Filters areas={areas} handleAreaChange={handleAreaChange} handleSortChange={handleSortChange} />
    );

    const selectElement = screen.getByText('Filter By Area:');
    fireEvent.change(selectElement, { target: { value: 'Area 2' } });

    expect(handleAreaChange).toHaveBeenCalledWith('Area 2');
  });

  it('should render sort by option correctly', () => {
    render(
      <Filters areas={areas} handleAreaChange={handleAreaChange} handleSortChange={handleSortChange} />
    );

    const selectElement = screen.getByText('Sort By:');
    expect(selectElement).toBeInTheDocument();
  });

  it('should call handleSortChange when sort selection is changed', () => {
    render(
      <Filters areas={areas} handleAreaChange={handleAreaChange} handleSortChange={handleSortChange} />
    );

    const selectElement = screen.getByText('Sort By:');
    fireEvent.change(selectElement, { target: { value: 'alphabetical' } });

    expect(handleSortChange).toHaveBeenCalledWith('alphabetical');
  });
});