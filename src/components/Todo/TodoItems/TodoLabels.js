import React from "react";
const TodoLabels = ({ listsToShow, witchLabelToShow, labelLength }) => {
  return (
    <div className="labels-container">
      <div
        className={`label-all todo-label ${
          listsToShow === "All" ? "lift" : ""
        }`}
        onClick={() => {
          witchLabelToShow("All");
        }}
      >
        ALL({labelLength.labelAllLength})
      </div>
      <div
        className={`label-todo todo-label ${
          listsToShow === "Todo" ? "lift" : ""
        }`}
        onClick={() => {
          witchLabelToShow("Todo");
        }}
      >
        TODO({labelLength.labelTodoLength})
      </div>
      <div
        className={`label-done todo-label ${
          listsToShow === "Done" ? "lift" : ""
        }`}
        onClick={() => {
          witchLabelToShow("Done");
        }}
      >
        DONE({labelLength.labelDoneLength})
      </div>
    </div>
  );
};
export default TodoLabels;
