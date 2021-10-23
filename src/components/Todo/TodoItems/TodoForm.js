import React from "react";
import InputRadio from "../InputRadio";
import { getYearMonthDayString } from "../../../utils/helpers/time.helper";
const TodoForm = ({ addTodo, setText, setDeadLine, setPriority, priority }) => {
  return (
    <>
      <form className="add-form-container" onSubmit={addTodo}>
        <textarea
          className="add-form-text"
          style={{ resize: "none" }}
          onChange={(e) => {
            setText(e.target.value);
          }}
        ></textarea>
        <button className="icon-plus button-style">
          <img src="/images/icon_plus.svg" alt="icon-plus" />
        </button>
        <div className="deadline-priority-con">
          <div className="deadline-con">
            <img
              src="/images/icon_deadline.svg"
              alt="icon deadline"
              className="deadline-icon"
            />
            <p>Deadline</p>
            <input
              type="date"
              className="add-form-deadline"
              min={getYearMonthDayString()}
              onChange={(e) => {
                setDeadLine(e.target.value);
              }}
            ></input>
          </div>
          <InputRadio setPriority={setPriority} priority={priority} />
        </div>
      </form>
    </>
  );
};
export default TodoForm;
