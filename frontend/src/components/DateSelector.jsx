import {Calendar, Camera} from "lucide-react"
import "../css/DateTime.css"
import { useEffect, useRef, useState } from "react";

const DateSelector = ({selectDate,setSelectDate,selectTime,setSelectTime ,startDate}) => {

    const [inputType, setInputType] = useState('text');

    const calenderRef=useRef();

    useEffect(()=>{
        if(inputType==="date" &&calenderRef.current){
            calenderRef.current.showPicker()
        }

    },[inputType])



  return (
    <div className="datetime-container">
      <label className="datetime-label"></label>
      <div className="datetime-group">

        <div className="input-section date-section">
          <span className="input-icon"><Calendar style={{width:"1rem",height:"1rem"}}></Calendar></span>
          <input 
            type={inputType} 
            ref={calenderRef}
            onFocus={() => setInputType('date')}
            className="common-input"
            placeholder="Pick a date"
            onBlur={(e)=>{
                if(!e.target.value)
                setInputType("text")
            }}
            min={startDate}
            value={selectDate}
            onChange={(e) => setSelectDate(e.target.value)}
            required
          />
        </div>
        <div className="input-section time-section">
          <span className="input-icon"></span>
          <input 
            type="time" 
            className="common-input"
            value={selectTime}
            onChange={(e) => setSelectTime(e.target.value)}
            required
          />
        </div>
      </div>
    </div>
  );
};

export default DateSelector;