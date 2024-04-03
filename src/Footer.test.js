import React from 'react';
import { render,screen } from '@testing-library/react';
import Footer from './Footer';

describe('Footer component', () => {
  it('should render the footer text correctly', () => {
    render(<Footer />);
    const footerElement = screen.getByText('© 2024 Food Menu App. All rights reserved.');
    expect(footerElement).toBeInTheDocument();
  });
});