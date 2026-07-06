import ProfileSelector from "../components/ProfileSelector.jsx";
import { useAddProfile } from "../hooks/useAddProfile.js";
import { useGetProfile } from "../hooks/useGetProfile.js";

export default function Dashboard() {
  const { data: profiles } = useGetProfile();
  const addProfileMutation = useAddProfile();

  const handleCreateProfile = (name) => {
    addProfileMutation.mutate(name);
  };

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
          <form>
            <label style={{ color: "black", display: "block" }}>Profiles</label>
            <ProfileSelector
              profiles={profiles}
              onCreateProfile={handleCreateProfile}
              isCreating={addProfileMutation.isPending}
            ></ProfileSelector>
          </form>
        </div>
        <div className="events"></div>
      </div>
    </div>
  );
}
