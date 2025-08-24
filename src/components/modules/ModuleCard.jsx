import { useState } from 'react';

import LinkCard from './LinkCard';
import FileCard from './FileCard';
import ModuleItem from './ModuleItem';
import { DeleteOutlinedImage, LinkOutlinedImage, PencilLineOutlinedImage, UploadImage } from '../ui';

const ModuleCard = ({
  module,
  onEdit,
  onDelete,
  items = [],
  onAddItem,
  onDeleteItem,
  attributes, listeners
}) => {


  // if the module is a link
  if (module.type === 'link') {
    return (
      <LinkCard
        module={module}
        onEdit={onEdit}
        onDelete={onDelete}
        attributes={attributes}
        listeners={listeners}
      />
    )
  } else if (module.type === 'file') {
    return (
      <FileCard
        module={module}
        onEdit={onEdit}
        onDelete={onDelete}
        attributes={attributes}
        listeners={listeners}
      />
    )
  }


  const [isOptionsOpen, setIsOptionsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isAddMenuOpen, setIsAddMenuOpen] = useState(false);

  const moduleItems = items.filter(item => item.moduleId === module.id);

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

  const toggleAddMenu = e => {
    e.stopPropagation();
    setIsAddMenuOpen(!isAddMenuOpen);
  };

  const handleAddClick = type => {
    onAddItem(module.id, type);
    setIsAddMenuOpen(false);
  };

  return (
    <div className="module-card-container" id={module.id}>

      <div className="module-card" onClick={toggleExpanded}>
        <div className="module-content">
          <div {...attributes} {...listeners} className="cursor-grab">
            ::
          </div>
          <div className="module-icon">
            <span className={`icon ${isExpanded ? 'expanded' : ''}`}>▼</span>
          </div>
          <div className="module-info">
            <h3 className="module-title">{module.title}</h3>
            <p className="module-subtitle">
              {moduleItems.length === 0
                ? 'Add items to this module'
                : `${moduleItems.length} item${moduleItems.length !== 1 ? 's' : ''}`}
            </p>
          </div>
        </div>
        <div className="module-actions">
          <button className="btn-options" onClick={toggleOptions}>
            <span className="options-icon">⋮</span>
          </button>
          {isOptionsOpen && (
            <div className="options-menu">
              <button className="option-item" onClick={handleEdit}>
                <span className="option-icon">
                  <img src={PencilLineOutlinedImage} alt="pencil icon" />
                </span>
                Edit module name
              </button>
              <button className="option-item delete" onClick={handleDelete}>
                <span className="option-icon">
                  <img src={DeleteOutlinedImage} alt="delete icon" />
                </span>
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
      {isExpanded && (
        <div className="module-content-expanded">
          {moduleItems.length === 0 ? (
            <div className="empty-module-content">
              <p className="empty-module-message">
                No content added to this module yet.
              </p>
              <div className="add-item-container">
                <button className="add-item-button" onClick={toggleAddMenu}>
                  <span className="add-icon">+</span> Add item
                </button>
                {isAddMenuOpen && (
                  <div className="add-item-menu">
                    <button
                      className="add-item-option options-divider"
                      onClick={() => handleAddClick('link')}
                    >
                      <span className="item-icon">
                        <img src={LinkOutlinedImage} alt="link icon" />
                      </span>
                      Add a link
                    </button>
                    <button
                      className="add-item-option options-divider"
                      onClick={() => handleAddClick('file')}
                    >
                      <span className="item-icon">
                        <img src={UploadImage} alt="upload image" />
                      </span>
                      Upload file
                    </button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="module-items">
              <div className="module-items-list">
                {moduleItems.map(item =>

                  <ModuleItem
                    item={item}
                    onDelete={onDeleteItem}
                  />
                )}
              </div>

              <div className="add-item-container">
                <button className="add-item-button" onClick={toggleAddMenu}>
                  <span className="add-icon">+</span> Add item
                </button>
                {isAddMenuOpen && (
                  <div className="add-item-menu">
                    <button
                      className="add-item-option"
                      onClick={() => handleAddClick('link')}
                    >
                      <span className="item-icon">
                        <img src={LinkOutlinedImage} alt="link icon" />
                      </span>
                      Add a link
                    </button>
                    <button
                      className="add-item-option"
                      onClick={() => handleAddClick('file')}
                    >
                      <span className="item-icon">
                        <img src={UploadImage} alt="upload image" />
                      </span>
                      Upload file
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ModuleCard;
