import React from 'react';
import { render, screen } from '@testing-library/react';
import { About } from './About';

describe('Given About component', () => {
  test('It renders contact info', () => {
    render(<About />);
    expect(screen.getByText('Hello World!')).toBeInTheDocument();
  });
});
