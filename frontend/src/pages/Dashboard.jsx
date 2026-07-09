import { useState } from "react";
import ProfileSelector from "../components/ProfileSelector.jsx";
import { useAddProfile } from "../hooks/useAddProfile.js";
import { useGetProfile } from "../hooks/useGetProfile.js";
import { useEffect } from "react";
import useCustomDebounceHook from "../hooks/useCustomDebounceHook.js";
import EventCreateForm from "../components/EventCreateForm.jsx";
import { useGetEventDetail } from "../hooks/useGetEventDetail.js";
import { useSelector } from "react-redux";
import EventList from "../components/Eventlist.jsx";

export default function Dashboard() {
   const [searchQuery, setSearchQuery] = useState("");
   const { finalInput } = useCustomDebounceHook(searchQuery);
  const { data: profiles = [] } = useGetProfile(finalInput ? finalInput : "");


   const addProfileMutation = useAddProfile();
  
  
  
    const handleCreateProfile = (name) => {
      addProfileMutation.mutate(name);
    };


  return (
    <div className="container" > 
      <div className="navbar-container">
        
        <div style={{width:"67vw"}}>
          <h1>Event Management</h1>
          <p className="mini-title">
            create and manage events across multiple users
          </p>
        </div>
        <div>
          <ProfileSelector
            profiles={profiles}
            handleCreateProfile={handleCreateProfile}
            isCreating={addProfileMutation.isPending}
            searchQuery={searchQuery}
            
            setSearchQuery={setSearchQuery}
            isGlobal={true}
          ></ProfileSelector>
        </div>
      </div>

      <div className="event-container">
        <div className="create-event">
          <EventCreateForm></EventCreateForm>
        </div>
        <div className="events" style={{overflow:"scroll"}}>
            <EventList ></EventList>
        </div>
      </div>
    </div>
  );
}
