import React from "react";

const TodoList = ({ lists, checkComplete, deleteList, priority }) => {
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
            <div className="todo-list-text-con">
              <p className="todo-list-text">{listdata.text} &nbsp;</p>
              <div className="todo-list-priority">
                <div
                  className={`todo-list-priority-circle ${listdata.priority}`}
                ></div>
                <p className="todo-list-priority-label">{listdata.priority}</p>
                <p className="todo-list-deadline-time">
                  {listdata.deadLine ? (
                    <>
                      <img
                        src="/images/icon_deadline-grey.svg"
                        alt="icon deadline"
                        className="deadline-icon"
                      />
                      {listdata.deadLine}
                    </>
                  ) : null}
                </p>
              </div>

              <p className="todo-list-create-time">
                {listdata.addTime ? `${listdata.addTime} Added` : ""}
              </p>
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
