import React from 'react';
import './UserCard.css';

function UserCard({ user }) {
    return (
        <div className="kanban-card">
            <div className="card-details">
                <h4>{user.name}</h4>
                <p>Availability: {user.available ? 'Available' : 'Not Available'}</p>
            </div>
        </div>
    );
}

export default UserCard;

