import { useState } from "react";
import ProfileSelector from "../components/ProfileSelector.jsx";
import { useAddProfile } from "../hooks/useAddProfile.js";
import { useGetProfile } from "../hooks/useGetProfile.js";
import { useEffect } from "react";
import useCustomDebounceHook from "../hooks/useCustomDebounceHook.js";
import EventCreateForm from "../components/EventCreateForm.jsx";

export default function Dashboard() {







 

  return (
    <div className="container">
      <div>
        <h1>Event Management</h1>
        <p className="mini-title">
          create and manage events across multiple users
        </p>
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
