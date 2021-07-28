import React from "react";
import "./InputRadio.css";
const InputRadio = ({ title, setPriority, priority }) => {
  return (
    <div
      className="input-radio-con"
      onChange={(e) => {
        setPriority(e.target.value);
      }}
    >
      <p>{title}</p>
      <input type="radio" name="priority-options" value="High" id="High" />
      <label htmlFor="High">High</label>
      <input type="radio" name="priority-options" value="Medium" id="Medium" />
      <label htmlFor="Medium">Medium</label>
      <input type="radio" name="priority-options" value="Low" id="Low" />
      <label htmlFor="Low">Low</label>
    </div>
  );
};
export default InputRadio;
