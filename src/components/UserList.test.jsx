import React from 'react';
import UserList from "./UserList.jsx";
import {fireEvent, render, screen, waitFor} from "@testing-library/react";
import axios from "axios";

jest.mock('axios');

const mockedUsers = [
    {
        id: 1,
        name: 'Leanne Graham',
        email: 'leanne@example.com',
        phone: '1-770-736-8031',
    },
    {
        id: 2,
        name: 'Ervin Howell',
        email: 'ervin@example.com',
        phone: '010-692-6593',
    },
    {
        id: 3,
        name: 'Clementine Bauch',
        email: 'clementine@example.com',
        phone: '1-463-123-4447',
    },
]

describe('UserList Tests', () => {
    
    beforeEach(() => {
        axios.get.mockResolvedValue({data: mockedUsers})
    })
    
    test('first load', async () => {
        render(<UserList/>)
        const inputElem = await screen.getByPlaceholderText('Search users')
        expect(inputElem).toBeInTheDocument();
    })
    
    test('users list', async () => {
        render(<UserList/>)
        await waitFor(async () => {
            const users = await screen.findAllByTestId('user-item');
            expect(users.length).toBe(3)
        })
        
    })
    
    test('filter', async () => {
        render(<UserList/>)
        const inputElem = await screen.getByPlaceholderText('Search users')
        fireEvent.change(inputElem, {target: {value: 'ervin'}})
        
        await waitFor(async () => {
            const users = await screen.findAllByTestId('user-item');
            expect(users.length).toBe(1)
            expect(users[0]).toHaveTextContent('Ervin Howell')
        })

    })
    
    test('more button', async () => {
        render(<UserList/>)
        await waitFor(async () => {
            const userItems = await screen.findAllByTestId('user-item');
            expect(userItems.length).toBeGreaterThan(0);
            
            const button = userItems[0].querySelector('[data-testid="more-btn"]');
            expect(button).toBeInTheDocument();
            
            fireEvent.click(button)
            
            const userCard = await screen.findByTestId('user-card');
            expect(userCard).toBeInTheDocument();
        })

    })
});