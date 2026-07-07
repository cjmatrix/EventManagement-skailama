import { useSelector } from "react-redux";
import { useGetEventDetail } from "../hooks/useGetEventDetail";
import TimezoneSelector from "./TimezoneSelector";
import { TIMEZONES } from "../constants/timezones";
import { useState } from "react";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import dayjs from "dayjs";
import EventCreateForm from "./EventCreateForm";
import Modal from "./Modal";
import "../css/Eventlist.css"
dayjs.extend(utc);
dayjs.extend(timezone);


export default function EventList() {
  const currentProfile = useSelector((state) => state.app.currentProfile);

  const { data: events=[] } = useGetEventDetail(
    currentProfile ? currentProfile._id : null,
  );

  const [modalOpen,setModalOpen]=useState(false);

  const [initialData,setInitialData]=useState(null)

//   const [selectedProfiles, setSelectedProfiles] = useState({});
  const [selectTimezone, setSelectTimezone] = useState(TIMEZONES[0]);

  return (
    <div style={{display:'flex',flexDirection:"column",gap:"2rem"}}>
      <div>
        <h1 style={{ fontSize: "1rem" }}>Events</h1>
        <p>View in timezone</p>

        <TimezoneSelector
          selectTimezone={selectTimezone}
          setSelectTimezone={setSelectTimezone}
        ></TimezoneSelector>
      </div>
      <div>
        {events.length === 0 ? (
          <p >No events found.</p>
        ) : (
          <div >
            {events.map((event) => {
              
              const formattedStart = dayjs(event.startTime)
                .tz(selectTimezone.value)
                .format("MMM D, YYYY");

            const formattedStartTime=dayjs(event.startTime).tz(selectTimezone.value).format("@ h:mm A")
              const formattedEnd = dayjs(event.endTime)
                .tz(selectTimezone.value)
                .format("MMM D, YYYY ");
            
                const formattedEndtTime=dayjs(event.endTime).tz(selectTimezone.value).format("@ h:mm A")

              return (
                <div
                  key={event._id}
                
                  style={{backgroundColor:"white",borderRadius:"1rem", border:"1px solid gray",padding:"1rem" ,display:"flex" ,flexDirection:"column",gap:"1rem"}}
                >   
                <div>
                {event.profiles.map(p=>{
                    return <span>{p.name+", "}</span>
                })}
                </div>
                
                 
                  <div style={{marginTop:"1rem"}}>
                    <p>
                      <strong>Start:</strong> {formattedStart}
                    </p>
                    <p>
                        {formattedStartTime}
                    </p>
                    <p>
                      <strong>End:</strong> {formattedEnd}
                    </p>
                    <p>
                        {formattedEndtTime}
                    </p>
                  </div>

                  <div className="mt-3 text-xs text-gray-500"
                  style={{marginTop:"0.8rem",color:"gray"}}>
                    <strong>Participants:</strong>{" "}
                    {event.profiles.map((p) => p.name).join(", ")}
                  </div>

                  <div className="mt-4 flex gap-2"
                  style={{marginTop:"1rem",display:"flex",justifyContent:"space-between"}}>
        
                    <button 
                        className="eventlist-btn"
                        onClick={()=>{setInitialData(event);setModalOpen(true)}}
                    >
                      Edit
                    </button>
                    <button  className="eventlist-btn">
                      View Logs
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
      <Modal isOpen={modalOpen} onClose={()=>setModalOpen(false)}>
        <h2 style={{ marginTop: 0, marginBottom: '20px', fontSize: '1.25rem', fontWeight: 'bold' }}>
          Edit Event
        </h2>
        
        <EventCreateForm
          initialData={initialData} 
          onClose={()=>setModalOpen(false)} 
        />
      </Modal>
    </div>
  );
}
