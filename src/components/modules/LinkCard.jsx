import { useState } from 'react';
import LinkImage from "../../assets/LinkColored.svg"

const LinkCard = ({
    module,
    onEdit,
    onDelete,
    attributes,
    listeners
}) => {

    if (module.url == null || module.url === '') return null;


    const [isOptionsOpen, setIsOptionsOpen] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleOptions = e => {
        e.stopPropagation();
        setIsOptionsOpen(!isOptionsOpen);
    };

    const toggleExpanded = () => {
        setIsExpanded(!isExpanded);
    };

    const handleEdit = () => {
        onEdit(module);
        setIsOptionsOpen(false);
    };

    const handleDelete = () => {
        onDelete(module.id);
        setIsOptionsOpen(false);
    };


    return (
        <div className="module-card-container">
            <div className="module-card" onClick={toggleExpanded}>
                <div className="module-content">
                    <div {...attributes} {...listeners} className="cursor-grab">
                        ::
                    </div>
                    <div className="module-icon">
                        <img src={LinkImage} alt='link image' />
                    </div>
                    <a href={module.url} target='_blank' className="module-info">
                        <h3 className="module-title">{module.title}</h3>
                        <p className='module-subtitle'>Link</p>
                    </a>
                </div>
                <div className="module-actions">
                    <button className="btn-options" onClick={toggleOptions}>
                        <span className="options-icon">⋮</span>
                    </button>
                    {isOptionsOpen && (
                        <div className="options-menu">
                            <button className="option-item" onClick={handleEdit}>
                                <span className="option-icon">✏️</span>
                                Edit
                            </button>
                            <button className="option-item delete" onClick={handleDelete}>
                                <span className="option-icon">🗑️</span>
                                Delete
                            </button>
                        </div>
                    )}
                </div>
            </div>

        </div>
    );
};

export default LinkCard;
