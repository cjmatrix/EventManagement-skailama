import { useState, useRef, useEffect } from 'react';
import "../css/ProfileSelector.css"

const ProfileSelector = ({ profiles,currentProfile,onCreateProfile ,isCreating}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [newProfileName, setNewProfileName] = useState('');
console.log(profiles)
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => { 
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="selector-container" ref={dropdownRef}>
      <button 
        type='button'
        className="trigger-btn"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{"Select current profile..."}</span>
        <span className="caret">↕</span> 
      </button>
      {isOpen && (
        <div className="dropdown-menu">
          <div className="search">
            <span className="search-icon">🔍</span>
            <input 
              type="text" 
              placeholder="Search current profile..." 
              className="search-input"
              disabled={isCreating}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <ul className="profile-list">
            {profiles.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase())).map((profile) => {
              const isSelected = currentProfile?._id === profile._id;
              return (
                <li 
                  key={profile._id}
                  onClick={() => {
                    // onSelectProfile(profile);
                    setIsOpen(false);
                  }}
                  className={`profile-item ${isSelected ? 'selected' : ''}`}
                >
                  {isSelected && <span className="checkmark">✓</span>}
                  {profile.name}
                </li>
              );
            })}
          </ul>
          <div className="add-section">
            <input 
              type="text" 
              className="add-input"
              value={newProfileName}
              onChange={(e) => setNewProfileName(e.target.value)}
            />
            <button 
            type='button'
              className="add-btn"
              disabled={isCreating}
              onClick={() => {
                if (newProfileName.trim()) {
                  onCreateProfile({name:newProfileName});
                  setNewProfileName('');
                }
              }}
            >
              Add
            </button>
          </div>

        </div>
      )}
    </div>
  );
};

export default ProfileSelector;