import React, { useState } from 'react';
import './KanbanDropdowns.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faSliders } from '@fortawesome/free-solid-svg-icons'; // You can choose any icon you like


function KanbanDropdowns({ display, sorting, handleDisplayChange, handleSortChange }) {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <div className="dropdown-container">
            <div className="menu">
                <button className="menu-button" onClick={toggleMenu}>
                    <FontAwesomeIcon icon={faSliders} /> {/* Add your desired icon here on the left */}
                    <span>Display</span>
                    <FontAwesomeIcon icon={faCaretDown} /> {/* Add your desired icon here on the right */}
                </button>


                {menuOpen && (
                    <div className="menu-options">
                        <label>
                            Grouping:
                            <select value={display} onChange={(e) => handleDisplayChange(e.target.value)}>
                                <option value="status">Status</option>
                                <option value="user">User</option>
                                <option value="priority">Priority</option>
                            </select>
                        </label><br /><br />
                        <label>
                            Ordering:
                            <select value={sorting} onChange={(e) => handleSortChange(e.target.value)}>
                                <option value="priority">Priority</option>
                                <option value="title">Title</option>
                            </select>
                        </label>
                    </div>
                )}
            </div>
        </div>
    );
}

export default KanbanDropdowns;
