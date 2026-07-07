import { useState } from "react";
import ProfileSelector from "./ProfileSelector";
import { useGetProfile } from "../hooks/useGetProfile";
import useCustomDebounceHook from "../hooks/useCustomDebounceHook";
import { useAddProfile } from "../hooks/useAddProfile";
import TimezoneSelector from "./TimezoneSelector";
import { TIMEZONES } from "../constants/timezones";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import DateSelector from "./DateSelector";
import useCreateEvent from "../hooks/useCreateEvent";
dayjs.extend(utc);

export default function EventCreateForm({initialData,onClose}) {

    const isEditMode = !!initialData;

    console.log(isEditMode)
     console.log(initialData)
    const defaultProfiles = {};
    if (isEditMode && initialData.profiles) {
       
    initialData.profiles.forEach(p => defaultProfiles[p._id] = p);
    console.log(defaultProfiles,"HEreeeeeeeeee")
    
  }


  const [searchQuery, setSearchQuery] = useState("");

  const { finalInput } = useCustomDebounceHook(searchQuery);
  const { data: profiles = [] } = useGetProfile(finalInput ? finalInput : "");
  const [selectedProfiles, setSelectedProfiles] = useState(defaultProfiles);
  const defaultTz = isEditMode 
    ? TIMEZONES.find(t => t.value === initialData.timezone) || TIMEZONES[0]
    : TIMEZONES[0];
  const [selectTimezone, setSelectTimezone] = useState(defaultTz);
  const defaultStartDate = isEditMode ? dayjs(initialData.startTime).tz(initialData.timezone).format("YYYY-MM-DD") : "";
  const defaultStartTime = isEditMode ? dayjs(initialData.startTime).tz(initialData.timezone).format("HH:mm") : "";
  
  const defaultEndDate = isEditMode ? dayjs(initialData.endTime).tz(initialData.timezone).format("YYYY-MM-DD") : "";
  const defaultEndTime = isEditMode ? dayjs(initialData.endTime).tz(initialData.timezone).format("HH:mm") : "";

  const [startDate, setStartDate] = useState(defaultStartDate);
  const [startTime, setStartTime] = useState(defaultStartTime);
  const [endDate, setEndDate] = useState(defaultEndDate);
  const [endTime, setEndTime] = useState(defaultEndTime);

  const [formError, setFormError] = useState("");

  const addProfileMutation = useAddProfile();

  const createEventMutation=useCreateEvent();

  const handleCreateProfile = (name) => {
    addProfileMutation.mutate(name);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError("");

    if (!startDate || !startTime || !endDate || !endTime ||Object.keys(selectedProfiles).length===0) {
      setFormError("Please fill out all date and time fields.");
      return;
    }

    const startDayjs = dayjs(`${startDate}T${startTime}`);
    const endDayjs = dayjs(`${endDate}T${endTime}`);

    if (endDayjs.isBefore(startDayjs) || endDayjs.isSame(startDayjs)) {
      setFormError("End time must be later than the start time.");
      return;
    }

    const payload = {
      profiles: Object.keys(selectedProfiles),
      timezone: selectTimezone.value,
      startTime: startDayjs.utc().format(),
      endTime: endDayjs.utc().format(),
    };

    if (isEditMode) {
      updateEventMutation.mutate({ id: initialData._id, data: payload }, {
        onSuccess: () => {
          if (onClose) onClose(); 
        }
      });
    } else {
      createEventMutation.mutate(payload, {
        onSuccess: () => {
         
          setSelectedProfiles({});
          setStartDate("");
          setStartTime("");
          setEndDate("");
          setEndTime("");
        }
      });
    }

   
  };


  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label style={{ color: "black", display: "block" }}>Profiles</label>
        <ProfileSelector
          profiles={profiles}
          handleCreateProfile={handleCreateProfile}
          isCreating={addProfileMutation.isPending}
          searchQuery={searchQuery}
          selectedProfiles={selectedProfiles}
          setSelectedProfiles={setSelectedProfiles}
          setSearchQuery={setSearchQuery}
          isGlobal={false}
        ></ProfileSelector>
      </div>
      <div>
        <label style={{ color: "black", display: "block" }}>Profiles</label>
        <TimezoneSelector
          selectTimezone={selectTimezone}
          setSelectTimezone={setSelectTimezone}
        ></TimezoneSelector>
      </div>
      <div>
        <label style={{ color: "black", display: "block" }}>Profiles</label>
        <DateSelector
          selectDate={startDate}
          setSelectDate={setStartDate}
          selectTime={startTime}
          setSelectTime={setStartTime}
        ></DateSelector>
      </div>
      <div>
        <label style={{ color: "black", display: "block" }}>Profiles</label>
        <DateSelector
          selectDate={endDate}
          setSelectDate={setEndDate}
          selectTime={endTime}
          setSelectTime={setEndTime}
          startDate={startDate}
        ></DateSelector>
      </div>
      {formError && (
        <div style={{ color: "red", marginTop: "10px", fontWeight: "bold" }}>
          {formError}
        </div>
      )}

      <button
        type="submit"
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          backgroundColor: "#8b5cf6",
          color: "white",
          borderRadius: "5px",
          border: "none",
          cursor: "pointer",
          width: "100%",
        }}
      >
        {isEditMode ? "Save Changes" : "+ Create Event"}
      </button>
    </form>
  );
}
