import { useEffect, useRef, useState } from "react";
import { TIMEZONES } from "../constants/timezones";

export default function TimezoneSelector({selectTimezone,setSelectTimezone}){
    const [isOpen,setIsOpen]=useState(false)
    const dropdownRef=useRef()
    const [searchQuery, setSearchQuery] = useState('')
 
    useEffect(()=>{
        const handleClickOutside=(event)=>{
            if(dropdownRef.current&& !dropdownRef.current.contains(event.target)){
                setIsOpen(false)
            }
        }

        document.addEventListener("mousedown",handleClickOutside)

        return ()=>document.removeEventListener("mousedown",handleClickOutside)

    })
    const filteredTimezones=TIMEZONES.filter((t)=>{
        return t.label.toLowerCase().includes(searchQuery.toLowerCase())
    })
 
    return(
        <div className="selector-container"  ref={dropdownRef}>
    
      <button 
        type="button"
        className="trigger-btn"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{selectTimezone.label}</span>
        <span className="caret">↕</span> 
      </button>

      {isOpen && (
        <div className="dropdown-menu">
    
          <div className="search-section" style={{display:"flex", gap:"1rem"}}>
            <span className="search-icon">🔍</span>
            <input 
              type="text" 
              placeholder="Search timezone..." 
              className="search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              autoFocus 
            />
          </div>


          <ul className="profile-list">
            {filteredTimezones.length > 0 ? (
              filteredTimezones.map((tz) => {
                const isSelected = selectTimezone.value === tz.value;
                return (
                  <li 
                    key={tz.value}
                    onClick={() => {
                      setSelectTimezone(tz); 
                      setIsOpen(false)
                      setSearchQuery(''); 
                    }}
                    className={`profile-item ${isSelected ? 'selected' : ''}`}
                  >
                    {isSelected && <span className="checkmark">✓</span>}
                    {tz.label}
                  </li>
                );
              })
            ) : (
              <li className="profile-item" style={{ color: '#94a3b8', cursor: 'default' }}>
                No timezone found.
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
    
}