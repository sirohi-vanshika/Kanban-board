import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStickyNote, faCircleExclamation, faExclamationCircle, faClock } from '@fortawesome/free-solid-svg-icons';

function KanbanCard({ ticket, priorityNames }) {
    const { id, title, description, priority, status, tag, userId } = ticket;

    const getStatusIcon = () => {
        let icon = null;

        switch (status) {
            case 'Todo':
                icon = <FontAwesomeIcon icon={faStickyNote} />;
                break;
            case 'In progress':
                icon = <FontAwesomeIcon icon={faClock} />;
                break;
            case 'Backlog':
                icon = <FontAwesomeIcon icon={faCircleExclamation} />;
                break;
            default:
                icon = <FontAwesomeIcon icon={faCircleExclamation} />;
                break;
        }

        return icon;
    }


    return (
        <div className="kanban-card">

            <div className="card-details">
                <h4>{id}</h4>
                <h3>{title}</h3>
                <p>{description}</p>
                <div className="card-icon">
                    {getStatusIcon()}
                </div>
                <p>{tag}</p>
                {/* <p>{status}</p>
                <p>{priority}</p>
                <p>{userId}</p> */}
            </div>
        </div>
    );
}

export default KanbanCard;

