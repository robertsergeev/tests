import React from 'react';

export default function UserCard({ user, onClose }) {
    if (!user) return null;
    
    return (
        <div data-testid={'user-card'} className="card" style={{ border: '1px solid #ccc', padding: '1rem', marginTop: '1rem' }}>
            <h3>{user.name}</h3>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Phone:</strong> {user.phone}</p>
            <button onClick={onClose}>Close</button>
        </div>
    );
}
