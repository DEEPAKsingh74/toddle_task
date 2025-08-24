import { DeleteOutlinedImage, LinkColoredImage, PDFColoredImage } from "../ui";

const ModuleItem = ({ item, onDelete }) => {
  // Render different UI based on item type

  const handleDelete = e => {
    e.stopPropagation();
    onDelete(item.id);
  };

  if (item.type === 'link') {
    return (
      <div className="module-item link-item">
        <div className="item-content">
          <div className="item-icon">
            <span className="icon-link">
              <img src={LinkColoredImage} alt="link icon" />
            </span>
          </div>
          <div className="item-info">
            <h4 className="item-title">{item.title}</h4>
            <a
              href={item.url}
              className="item-url"
              target="_blank"
              rel="noopener noreferrer"
            >
              {item.url}
            </a>
          </div>
        </div>
        <button className="item-delete" onClick={handleDelete}>
          <span className="delete-icon">
            <img src={DeleteOutlinedImage} alt="delete icon" />
          </span>
        </button>
      </div>
    );
  }

  if (item.type === 'file') {
    return (
      <div className="module-item file-item">
        <div className="item-content">
          <div className="item-icon">
            <span className="icon-file">
              <img src={PDFColoredImage} alt="pdf icon" />
            </span>
          </div>
          <div className="item-info">
            <h4 className="item-title">{item.title}</h4>
            <p className="item-details">
              {item.fileName} ({Math.round(item.fileSize / 1024)} KB)
            </p>
          </div>
        </div>
        <button className="item-delete" onClick={handleDelete}>
          <span className="delete-icon">
            <img src={DeleteOutlinedImage} alt="delete icon" />
          </span>
        </button>
      </div>
    );
  }

  return null; // Fallback for unknown item types
};

export default ModuleItem;
