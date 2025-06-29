import { render, screen } from '@testing-library/react';
import { Footer } from '@/components/Footer/Footer';

describe('Footer', () => {
    test('renders thank you message', () => {
        render(<Footer />);
        expect(screen.getByText(/thank you for visiting/i)).toBeInTheDocument();
    });

    test('renders feedback link', () => {
        render(<Footer />);
        expect(
            screen.getByRole('link', { name: /leave feedback here/i }),
        ).toBeInTheDocument();
    });

    test('renders all social media links', () => {
        render(<Footer />);
        const platforms = ['BlueSky', 'Facebook', 'Instagram', 'Threads', 'X'];

        platforms.forEach((platform) => {
            expect(
                screen.getByRole('link', { name: new RegExp(platform, 'i') }),
            ).toBeInTheDocument();
        });
    });
});
