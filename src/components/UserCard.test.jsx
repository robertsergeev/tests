import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import UserCard from './UserCard.jsx';

const user = {
    name: 'Leanne Graham',
    email: 'leanne@example.com',
    phone: '1-770-736-8031',
};

describe('UserCard Tests', () => {
    test('does not render without user', () => {
        const { container } = render(<UserCard user={null} onClose={() => {}} />);
        expect(container.firstChild).toBeNull();
    });
    
    test('renders user info correctly', () => {
        render(<UserCard user={user} onClose={() => {}} />);
        
        const card = screen.getByTestId('user-card');
        expect(card).toBeInTheDocument();
        expect(card).toHaveTextContent('Leanne Graham');
        expect(card).toHaveTextContent('leanne@example.com');
        expect(card).toHaveTextContent('1-770-736-8031');
    });
    
    test('calls onClose when button is clicked', () => {
        const handleClose = jest.fn();
        render(<UserCard user={user} onClose={handleClose} />);
        
        const button = screen.getByText('Close');
        fireEvent.click(button);
        expect(handleClose).toHaveBeenCalledTimes(1);
    });
});
