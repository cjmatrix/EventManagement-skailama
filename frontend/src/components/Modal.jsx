
import {createPortal} from "react-dom"
export default function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null; 

 const outerStyle = {
     position: "fixed",
     top: 0,
     left: 0,
     right: 0,
     bottom: 0,
     backgroundColor: "rgba(0, 0, 0, 0.5)",
     backdropFilter: "blur(4px)",
     WebkitBackdropFilter: "blur(4px)",
     display: "flex",
     justifyContent: "center",
     alignItems: "center",
     zIndex: 9999,
   };
 
   const containerStyle = {
     backgroundColor: "white",
     padding: "24px",
     borderRadius: "8px",
     width: "100%",
     maxWidth: "500px", 
     maxHeight: "90vh", 
     overflowY: "auto",
     boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)", 
   };

  return createPortal(
    <div 
      style={outerStyle} 
      onClick={onClose} 
    >
      <div 
        style={containerStyle} 
        onClick={(e) => e.stopPropagation()} 
      >
        {children}
      </div>
    </div>,document.body
  );
}