import { useState } from "react";
import ProfileSelector from "../components/ProfileSelector.jsx";
import { useAddProfile } from "../hooks/useAddProfile.js";
import { useGetProfile } from "../hooks/useGetProfile.js";
import { useEffect } from "react";
import useCustomDebounceHook from "../hooks/useCustomDebounceHook.js";
import EventCreateForm from "../components/EventCreateForm.jsx";

export default function Dashboard() {
   const [searchQuery, setSearchQuery] = useState("");
   const { finalInput } = useCustomDebounceHook(searchQuery);
  const { data: profiles = [] } = useGetProfile(finalInput ? finalInput : "");
 
 
   const addProfileMutation = useAddProfile();
  
  
  
    const handleCreateProfile = (name) => {
      addProfileMutation.mutate(name);
    };


  return (
    <div className="container">
      <div style={{ display: "flex" }}>
        <div>
          <ProfileSelector
            profiles={profiles}
            handleCreateProfile={handleCreateProfile}
            isCreating={addProfileMutation.isPending}
            searchQuery={searchQuery}
            // selectedProfiles={selectedProfiles}
            // setSelectedProfiles={setSelectedProfiles}
            setSearchQuery={setSearchQuery}
            isGlobal={true}
          ></ProfileSelector>
        </div>
        <div>
          <h1>Event Management</h1>
          <p className="mini-title">
            create and manage events across multiple users
          </p>
        </div>
      </div>

      <div className="event-container">
        <div className="create-event">
          <EventCreateForm></EventCreateForm>
        </div>
        <div className="events"></div>
      </div>
    </div>
  );
}
