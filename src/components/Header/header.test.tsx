import { render, screen, fireEvent } from '@testing-library/react';
import { Header } from './Header';

describe('Header component', () => {
    test('does not render the Close menu button initially', () => {
        render(<Header />);
        const closeMenuButton = screen.queryByLabelText('Close menu');
        expect(closeMenuButton).not.toBeInTheDocument(); // because it's not rendered
    });

    test('renders the Close menu button after clicking Open menu', () => {
        render(<Header />);
        const openMenuButton = screen.getByLabelText('Open menu');
        fireEvent.click(openMenuButton);
        const closeMenuButton = screen.getByLabelText('Close menu');
        expect(closeMenuButton).toBeInTheDocument(); // now it's rendered
    });
});
