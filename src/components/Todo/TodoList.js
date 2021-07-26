import React from "react";

const TodoList = ({ lists, checkComplete, deleteList }) => {
  return (
    <>
      {lists.map((listdata) => {
        return (
          <div className="todo-list" key={listdata.id}>
            <button
              className={`check-box ${listdata.complete ? "checked" : ""}`}
              onClick={() => {
                checkComplete(listdata.id);
              }}
            >
              {listdata.complete ? (
                <img src="/images/icon_check.svg" alt="icon-check" />
              ) : null}
            </button>
            <div className="todo-list-text">
              <p>{listdata.text}</p>
              <p className="todo-list-text-time">- {listdata.time}</p>
            </div>
            <button
              className="icon-trash"
              onClick={() => {
                deleteList(listdata.id);
              }}
            >
              <img src="/images/icon_trash.svg" alt="icon-trash" />
            </button>
          </div>
        );
      })}
    </>
  );
};
export default TodoList;
