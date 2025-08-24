import { useState } from 'react';
import PDFImage from "../../assets/PDFColored.svg"

const FileCard = ({
    module,
    onEdit,
    onDelete,
    attributes,
    listeners
}) => {
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

    const handleDownload = () => {
        if (!module.fileObject) {
            return;
        }

        const item = module;

        const url = URL.createObjectURL(item.fileObject);
        const link = document.createElement('a');
        link.href = url;
        link.download = item.fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    }


    return (
        <div className="module-card-container">
            <div className="module-card" onClick={toggleExpanded}>
                <div className="module-content">
                    <div {...attributes} {...listeners} className="cursor-grab">
                        ::
                    </div>
                    <div className="module-icon">
                        <img src={PDFImage} alt='link image' />
                    </div>
                    <div className="module-info">
                        <h3 className="module-title">{module.title}</h3>
                        <p className='module-subtitle'>PDF</p>
                    </div>
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
                            <button className="option-item" onClick={handleDownload}>
                                <span className="option-icon">⬇</span>
                                Download
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

export default FileCard;
