// src/__tests__/header.test.tsx

import { render, screen } from '@testing-library/react';
import { Header } from '../components/Header/Header';

describe('Header component', () => {
    test('renders the Open menu button', () => {
        render(<Header />);
        const openMenuButton = screen.getByLabelText('Open menu');
        expect(openMenuButton).toBeInTheDocument();
    });

    test('renders the Close menu button (initially hidden)', () => {
        render(<Header />);
        const closeMenuButton = screen.getByLabelText('Close menu');
        expect(closeMenuButton).toBeInTheDocument();
    });

    test('renders all navigation links', () => {
        render(<Header />);
        expect(screen.getByText(/home/i)).toBeInTheDocument();
        expect(screen.getByText(/about/i)).toBeInTheDocument();
        expect(screen.getByText(/more resources/i)).toBeInTheDocument();
        expect(screen.getByText(/add a group/i)).toBeInTheDocument();
        expect(screen.getByText(/blog/i)).toBeInTheDocument();
    });
});
