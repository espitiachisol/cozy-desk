import React from 'react';
import InputRadio from '../InputRadio';
import { getYearMonthDayString } from '../../../utils/helpers/time';

const TodoForm = ({
  addTodo, setText, setDeadLine, setPriority, priority,
}) => (
  <>
    <form className="add-form-container" onSubmit={addTodo}>
      <textarea
        className="add-form-text"
        style={{ resize: 'none' }}
        onChange={(e) => {
          setText(e.target.value);
        }}
      />
      <button className="icon-plus button-style">
        <img src="/images/icon_plus.svg" alt="icon-plus" />
      </button>
      <div className="deadline-priority-con">
        <div className="deadline-con">
          <img src="/images/icon_deadline.svg" alt="icon deadline" className="deadline-icon" />
          <p>Deadline</p>
          <input
            type="date"
            className="add-form-deadline"
            min={getYearMonthDayString()}
            onChange={(e) => {
              setDeadLine(e.target.value);
            }}
          />
        </div>
        <InputRadio setPriority={setPriority} priority={priority} />
      </div>
    </form>
  </>
);
export default TodoForm;
