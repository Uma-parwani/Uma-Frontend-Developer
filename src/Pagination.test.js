import React from 'react';
import { render,screen, fireEvent } from '@testing-library/react';
import Pagination from './Pagination';

describe('Pagination component', () => {
  it('should render previous and next buttons correctly', () => {
    render(<Pagination />);
    const prevButton = screen.getByText('«');
    const nextButton = screen.getByText('»');
    expect(prevButton).toBeInTheDocument();
    expect(nextButton).toBeInTheDocument();
  });

  it('should render page buttons correctly', () => {
    render(<Pagination />);
    for (let i = 1; i <= 7; i++) {
      const pageButton = screen.getByText(i.toString());
      expect(pageButton).toBeInTheDocument();
    }
  });

  it('should be visible previous', () => {
    render(<Pagination />);
    const prevButton = screen.getByText('«');
    fireEvent.click(prevButton);
    expect(prevButton).toBeDisabled();
  });

  it('should be visible next button', () => {
    render(<Pagination />);
    const nextButton = screen.getByText('»');
    fireEvent.click(nextButton);
    expect(nextButton).toBeVisible();
  });

  it('should navigate to the correct page when page button is clicked', () => {
    render(<Pagination />);
    const pageButton = screen.getByText('3');
    fireEvent.click(pageButton);
    expect(pageButton).toHaveClass('bg-green-500 text-white');
    expect(pageButton).not.toHaveClass('hover:bg-gray-300');
  });
});