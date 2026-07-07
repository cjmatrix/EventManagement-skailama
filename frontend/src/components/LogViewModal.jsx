import React from 'react';
import dayjs from 'dayjs';
import { Clock, X } from 'lucide-react';
import '../css/ViewLogs.css';

export default function LogViewModal({ event, onClose }) {

  const logs = event?.updateLogs || [];

 
  const getLogMessage = (log) => {
    const { newData } = log;
    if (!newData) return "Event updated";

    if (newData.profiles) {
      const names = newData.profiles.map(p => p.name || 'Unknown User').join(', ');
      return `Profiles changed to: ${names}`;
    }
    if (newData.startTime || newData.endTime) {
      return "Start date/time updated";
    }
    if (newData.timezone) {
      return `Timezone changed to: ${newData.timezone}`;
    }
    
    return "Event details updated";
  };

  return (
    <div className="logs-container">
      
   
      <div className="logs-header">
        <h2 className="logs-title">Event Update History</h2>
        <button type="button" className="close-btn" onClick={onClose} aria-label="Close">
          <X size={16} strokeWidth={2.5} />
        </button>
      </div>

   
      <div className="logs-list">
        {logs.length === 0 ? (
          <p className="no-logs">No updates have been made to this event yet.</p>
        ) : (
          [...logs].reverse().map((log) => (
            <div key={log._id} className="log-card">
              <div className="log-time">
                <Clock size={14} className="clock-icon" />
                <span>{dayjs(log.createdAt).format('MMM D, YYYY [at] hh:mm A')}</span>
              </div>
              <div className="log-message">
                {getLogMessage(log)}
              </div>
            </div>
          ))
        )}
      </div>
      
    </div>
  );
}