import { render, screen } from '@testing-library/react';

test('renders hello message', () => {
    render(<h1>Hello, Bristol!</h1>);
    expect(screen.getByText(/hello, bristol!/i)).toBeInTheDocument();
});
