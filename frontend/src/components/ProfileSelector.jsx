import { useState, useRef, useEffect } from 'react';
import  "../css/Selector.css"

const ProfileSelector = ({ profiles,handleCreateProfile ,isCreating,searchQuery,setSearchQuery,selectedProfiles,setSelectedProfiles}) => {
  const [isOpen, setIsOpen] = useState(false);

  const [newProfileName, setNewProfileName] = useState('');

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
        <span>{Object.keys(selectedProfiles).length?`${Object.keys(selectedProfiles).length } profiles selected`:"Select current profile..."}</span>
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
            {profiles.map((profile) => {
              const isSelected = selectedProfiles[profile._id];
              return (
                <li 
                  key={profile._id}
                  onClick={() => {
                    if(selectedProfiles[profile._id]){
                      setSelectedProfiles((prev)=>{
                      const {[profile._id]:_, ...rest}=prev
                      return rest
                      })
                      
                    }
                    else{
                      setSelectedProfiles((prev)=>({...prev,[profile._id]:profile}))
                    }
                 
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
                  handleCreateProfile({name:newProfileName});
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