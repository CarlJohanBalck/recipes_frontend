import { render, screen } from '@testing-library/react';
import App from './App';
import Recepies
 from './components/Recepies';

 
test('renders learn react link', () => {
  render(<Recepies />);
  const linkElement = screen.getByText(/Hämtar recept från databas/i);

  expect(linkElement).toBeInTheDocument();
});
