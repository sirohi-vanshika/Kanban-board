import React, { useState, useEffect } from 'react';
import KanbanCard from './KanbanCard';
import KanbanDropdowns from './KanbanDropdowns';
import UserCard from './UserCard';
import axios from 'axios';
import './kanban.css';

function KanbanBoard() {
    const [tickets, setTickets] = useState([]);
    const [display, setDisplay] = useState('status');
    const [sorting, setSorting] = useState('priority');
    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios.get('https://api.quicksell.co/v1/internal/frontend-assignment')
            .then((response) => {
                const modifiedData = response.data.tickets.map((ticket) => ({
                    ...ticket,
                    userId: ticket.userId || 'defaultUserId',
                    tag: ticket.tag || ['defaultTag'],
                }));
                setTickets(modifiedData);
                setUsers(response.data.users);
            })
            .catch((error) => {
                console.error('Error fetching data: ', error);
            });
    }, []);

    // Sorting function
    // Sorting function
    function sortTickets(tickets) {
        if (sorting === 'priority') {
            return tickets.sort((a, b) => {
                // Define the priority order based on provided values
                const priorityOrder = {
                    'Urgent': 4,
                    'High': 3,
                    'Medium': 2,
                    'Low': 1,
                    'No priority': 0,
                };

                // Compare tickets based on priority levels in descending order
                return priorityOrder[b.priority] - priorityOrder[a.priority];
            });
        } else if (sorting === 'title') {
            return tickets.sort((a, b) => a.title.localeCompare(b.title));
        }
        // Add more sorting options here if needed
        return tickets;
    }

    function groupTickets(tickets) {
        if (display === 'user') {
            const grouped = {};
            tickets.forEach((ticket) => {
                const userId = ticket.userId;
                if (!grouped[userId]) {
                    grouped[userId] = [];
                }
                grouped[userId].push(ticket);
            });

            for (const userId in grouped) {
                grouped[userId] = sortTickets(grouped[userId]);
            }

            return grouped;
        } else if (display === 'status') {
            const grouped = {};
            tickets.forEach((ticket) => {
                const status = ticket.status;
                if (!grouped[status]) {
                    grouped[status] = [];
                }
                grouped[status].push(ticket);
            });

            for (const status in grouped) {
                grouped[status] = sortTickets(grouped[status]);
            }

            return grouped;
        }
        return null; // No grouping
    }






    const sortedTickets = sortTickets(tickets);
    const groupedTickets = groupTickets(sortedTickets);

    return (
        <>
            <div>
                <KanbanDropdowns
                    display={display}
                    sorting={sorting}
                    handleDisplayChange={(newDisplay) => setDisplay(newDisplay)}
                    handleSortChange={(newSorting) => setSorting(newSorting)}
                />
            </div>
            <div className="kanban-board">
                {display === 'user' && Object.keys(groupedTickets).map((userId) => (
                    <div key={userId} className="user-group">
                        <UserCard user={users.find((user) => user.id === userId)} />
                        {groupedTickets[userId].map((ticket) => (
                            <KanbanCard key={ticket.id} ticket={ticket} />
                        ))}
                    </div>
                ))}
                {display !== 'user' && sortedTickets.map((ticket) => (
                    <KanbanCard key={ticket.id} ticket={ticket} />
                ))}
            </div>
        </>
    );
}

export default KanbanBoard;
