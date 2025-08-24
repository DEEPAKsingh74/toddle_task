import { useState, useRef, useEffect } from 'react';
import { AddOutlinedImage, CaretDownFilledImage, CreateModuleImage, LinkColoredImage, LinkOutlinedImage, SearchOutlinedImage, UploadImage } from '.';

const Header = ({ onAddClick, onSearchChange }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const [searchText, setSearchText] = useState('');

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = event => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef]);

  const handleAddClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchText(value);
    onSearchChange(value);
  };

  const handleCreateModule = () => {
    onAddClick('module');
    setIsDropdownOpen(false);
  };

  const handleAddLink = () => {
    onAddClick('link');
    setIsDropdownOpen(false);
  };

  const handleUpload = () => {
    onAddClick('upload');
    setIsDropdownOpen(false);
  };

  return (
    <div className="header">
      <h1 className="header-title">Course builder</h1>
      <div className="header-right">
        <div className="search-container">
          <img src={SearchOutlinedImage} alt="search image" />
          <input
            type="text"
            placeholder="Search..."
            className="search-input"
            value={searchText}
            onChange={handleInputChange}
          />
        </div>
        <div className="dropdown-container" ref={dropdownRef}>
          <button className="add-button" onClick={handleAddClick}>
            <img src={AddOutlinedImage} alt="add image" className='svg-icons' />
            <span>Add</span>
          </button>
          {isDropdownOpen && (
            <div className="dropdown-menu">
              <button className="dropdown-item options-divider" onClick={handleCreateModule}>
                <span className="item-icon">
                  <img src={CreateModuleImage} alt='create module icon' />
                </span>
                Create module
              </button>
              <button className="dropdown-item options-divider" onClick={handleAddLink}>
                <span className="item-icon">
                  <img src={LinkOutlinedImage} alt='link icon' />
                </span>
                Add a link
              </button>
              <button className="dropdown-item options-divider" onClick={handleUpload}>
                <span className="item-icon">
                  <img src={UploadImage} alt='upload icon' />
                </span>
                Upload
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
