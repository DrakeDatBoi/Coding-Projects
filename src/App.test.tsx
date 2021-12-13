import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders "Learning how to do testing"', () => {
  render(<App />);
  const linkElement = screen.getByText(/Learning how to do testing/i);
  expect(linkElement).toBeInTheDocument();
});
