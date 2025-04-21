import {useEffect, useState} from 'react';
import {filterUsers} from '../utils/filters';
import UserCard from './UserCard';
import axios from "axios";

export default function UserList() {
    const [users, setUsers] = useState([]);
    const [query, setQuery] = useState('');
    const [selectedUser, setSelectedUser] = useState(null);
    
    useEffect(() => {
        axios.get('https://jsonplaceholder.typicode.com/users')
            .then(res => setUsers(res.data))
            .catch(err => console.log(err))
    }, []);
    
    const filtered = filterUsers(users, query);
    
    return (
        <div>
            <input
                placeholder="Search users"
                value={query}
                onChange={e => setQuery(e.target.value)}
            />
            <ul>
                {filtered.map(user => (
                    <li data-testid={'user-item'} key={user.id}>
                        {user.name}{' '}
                        <button data-testid={'more-btn'} onClick={() => setSelectedUser(user)}>Подробнее</button>
                    </li>
                ))}
            </ul>
            <UserCard user={selectedUser} onClose={() => setSelectedUser(null)}/>
        </div>
    );
}
