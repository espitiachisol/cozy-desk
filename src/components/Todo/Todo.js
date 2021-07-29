import React, { useState, useCallback, useEffect } from "react";
import useDrag from "../hooks/useDrag";
import WindowHeader from "../windowHeader/WindowHeader";
import TodoList from "./TodoList";
import "./Todo.css";
import Alert from "../Alert/Alert";
import { firestore } from "../../firebaseConfig";
import InputRadio from "./InputRadio";
const converPriorityToNumber = (item) => {
  let result;
  switch (item) {
    case "High":
      result = 3;
      break;
    case "Medium":
      result = 2;
      break;
    case "Low":
      result = 1;
      break;
    default:
      result = 0;
  }
  return result;
};

const Todo = function ({
  setShowWindow,
  showWindow,
  zIndex,
  setZIndex,
  userState,
  setUserstate,
}) {
  const [size, setSize] = useState({});
  const [startPositon, setStartPositon] = useState({});
  const [text, setText] = useState("");
  const [deadLine, setDeadLine] = useState("");
  const [priority, setPriority] = useState(null);
  const [listsToShow, setListsToShow] = useState("All");
  const [todolistAll, setTodolistAll] = useState([]);
  const [todolistAllShow, setTodolistAllShow] = useState([]);
  const [todolistTodo, setTodolistTodo] = useState([]);
  const [todolistDone, setTodolistDone] = useState([]);
  const [showAlert, setShowAlert] = useState(false);

  const curWindow = useCallback((node) => {
    if (node !== null) {
      const response = node.getBoundingClientRect();
      setStartPositon({
        x: response.x,
        y: response.y - 32,
      });
      setSize({ width: response.width, height: response.height });
    }
  }, []);
  let startingPosition = {
    x: startPositon.x,
    y: startPositon.y,
    width: size.width,
    height: size.height,
    defaultX: 20,
    defaultY: 20,
  };
  const [position, mouseDown] = useDrag(startingPosition);
  useEffect(() => {
    if (userState) {
      firestore
        .collection("todoLists")
        .doc(userState)
        .get()
        .then((doc) => {
          if (doc.exists) {
            console.log("Document data:", doc.data());
            setTodolistAll(doc.data().todolist);
          } else {
            console.log("No such document!");
          }
        })
        .catch((error) => {
          console.log("Error getting document:", error);
        });
    }
    return () => {
      setTodolistAll([]);
    };
  }, [userState]);
  const addTodo = (e) => {
    e.preventDefault();
    console.log(e);
    let day = new Date();
    let id = "list" + day.getTime();

    let data = {
      id: id,
      text: text,
      deadLine: deadLine,
      priority: priority,
      complete: false,
    };
    if (userState) {
      firestore
        .collection("todoLists")
        .doc(userState)
        .set({ todolist: [...todolistAll, data] })
        .then(() => {
          setTodolistAll([...todolistAll, data]);

          console.log("Document successfully written!");
        })
        .catch((error) => {
          console.error("Error writing document: ", error);
        });
    } else {
      //使用者沒有登入的狀況
      setTodolistAll([...todolistAll, data]);
    }
    //clear form
    e.target[0].value = ""; //text
    e.target[2].value = ""; //deadline
    e.target[3].checked = false; //audio
    e.target[4].checked = false; //audio
    e.target[5].checked = false; //audio
    setText("");
    setPriority("");
    setDeadLine("");
  };
  const deleteList = (listid) => {
    let deleteAListFromLists = todolistAll.filter((each) => each.id !== listid);
    if (userState) {
      //刪除的話直接用寫入覆蓋原本的array
      firestore
        .collection("todoLists")
        .doc(userState)
        .set({ todolist: deleteAListFromLists })
        .then(() => {
          setTodolistAll(deleteAListFromLists);
          console.log("Document successfully updte!!!");
        })
        .catch((error) => {
          console.error("Error writing document: ", error);
        });
    } else {
      //使用者沒有登入的狀況
      setTodolistAll(deleteAListFromLists);
    }
  };
  const checkComplete = (listid) => {
    console.log(listid);
    let checkALisToComplete = todolistAll.map((each) => {
      if (each.id === listid) {
        each.complete = !each.complete;
      }
      return each;
    });
    if (userState) {
      firestore
        .collection("todoLists")
        .doc(userState)
        .set({ todolist: checkALisToComplete })
        .then(() => {
          setTodolistAll(checkALisToComplete);
          console.log("Document successfully updte!!!");
        })
        .catch((error) => {
          console.error("Error writing document: ", error);
        });
    } else {
      //使用者沒有登入的狀況
      setTodolistAll(checkALisToComplete);
    }
  };
  const clearAll = () => {
    if (userState) {
      firestore
        .collection("todoLists")
        .doc(userState)
        .delete()
        .then(() => {
          console.log("Document successfully deleted!");
          setTodolistAll([]);
        })
        .catch((error) => {
          console.error("Error removing document: ", error);
        });
    } else {
      setTodolistAll([]);
    }
    setShowAlert(false);
  };
  const clearAllDone = () => {
    let filteredAllDone = todolistAll.filter((each) => each.complete !== true);
    if (userState) {
      firestore
        .collection("todoLists")
        .doc(userState)
        .set({ todolist: filteredAllDone })
        .then(() => {
          setTodolistAll(filteredAllDone);
          console.log("Document successfully updte!!!");
        })
        .catch((error) => {
          console.error("Error writing document: ", error);
        });
    } else {
      //使用者沒有登入的狀況
      setTodolistAll(filteredAllDone);
    }
  };
  useEffect(() => {
    setTodolistAllShow(todolistAll);
  }, [todolistAll]);
  useEffect(() => {
    setTodolistTodo(todolistAllShow.filter((each) => !each.complete));
    setTodolistDone(todolistAllShow.filter((each) => each.complete));
  }, [todolistAllShow]);

  const displayAll = () => {
    setListsToShow("All");
  };
  const displayTodo = () => {
    setListsToShow("Todo");
  };
  const displayDone = () => {
    setListsToShow("Done");
  };
  const sortDeadline = (label) => {
    const deadlineArray = [...todolistAll];
    if (label === "Increase") {
      deadlineArray.sort((listFir, listSec) => {
        listFir = Number(listFir.deadLine.replaceAll("-", ""));
        listSec = Number(listSec.deadLine.replaceAll("-", ""));
        if (listFir < listSec) {
          return -1;
        }
        if (listFir > listSec) {
          return 1;
        }
        return 0;
      });
    } else if (label === "Decrease") {
      deadlineArray.sort((listFir, listSec) => {
        listFir = Number(listFir.deadLine.replaceAll("-", ""));
        listSec = Number(listSec.deadLine.replaceAll("-", ""));
        if (listFir > listSec) {
          return -1;
        }
        if (listFir < listSec) {
          return 1;
        }
        return 0;
      });
    }
    setTodolistAllShow(deadlineArray);
  };

  const sortPriority = (label) => {
    const priorityArray = [...todolistAll];
    if (label === "Increase") {
      priorityArray.sort((listFir, listSec) => {
        listFir = converPriorityToNumber(listFir.priority);
        listSec = converPriorityToNumber(listSec.priority);
        if (listFir < listSec) {
          return -1;
        }
        if (listFir > listSec) {
          return 1;
        }
        return 0;
      });
    } else if (label === "Decrease") {
      priorityArray.sort((listFir, listSec) => {
        listFir = converPriorityToNumber(listFir.priority);
        listSec = converPriorityToNumber(listSec.priority);
        if (listFir > listSec) {
          return -1;
        }
        if (listFir < listSec) {
          return 1;
        }
        return 0;
      });
    }
    console.log(priorityArray);
    setTodolistAllShow(priorityArray);
  };

  return (
    <div
      className="todo window"
      ref={curWindow}
      style={{ top: position.y, left: position.x, zIndex: zIndex.Todo }}
      onMouseDown={() => {
        if (zIndex.curW !== "Todo") {
          setZIndex({
            ...zIndex,
            Todo: zIndex.cur,
            cur: zIndex.cur + 1,
            curW: "Todo",
          });
        }
      }}
    >
      <WindowHeader
        mouseDown={mouseDown}
        setShowWindow={setShowWindow}
        showWindow={showWindow}
        label="Todo"
      />
      <div className="todo-container-all">
        <div className="todo-container">
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
              <div>
                <p>Deadline</p>
                <input
                  type="date"
                  className="add-form-deadline"
                  onChange={(e) => {
                    setDeadLine(e.target.value);
                  }}
                ></input>
              </div>
              <InputRadio
                title="Priority"
                setPriority={setPriority}
                priority={priority}
              />
            </div>
          </form>
          <div className="display-todo-container">
            <div className="labels-container">
              <div
                className={`label-all todo-label ${
                  listsToShow === "All" ? "lift" : ""
                }`}
                onClick={displayAll}
              >
                ALL({todolistAll.length})
              </div>
              <div
                className={`label-todo todo-label ${
                  listsToShow === "Todo" ? "lift" : ""
                }`}
                onClick={displayTodo}
              >
                TODO({todolistTodo.length})
              </div>
              <div
                className={`label-done todo-label ${
                  listsToShow === "Done" ? "lift" : ""
                }`}
                onClick={displayDone}
              >
                DONE({todolistDone.length})
              </div>
            </div>
            <div className={`todo-label-line ${listsToShow}`}></div>
            <div className="todo-content">
              {listsToShow === "All" ? (
                <TodoList
                  lists={todolistAllShow}
                  checkComplete={checkComplete}
                  deleteList={deleteList}
                  priority={priority}
                />
              ) : null}
              {listsToShow === "Todo" ? (
                <TodoList
                  lists={todolistTodo}
                  checkComplete={checkComplete}
                  deleteList={deleteList}
                  priority={priority}
                />
              ) : null}
              {listsToShow === "Done" ? (
                <TodoList
                  lists={todolistDone}
                  checkComplete={checkComplete}
                  deleteList={deleteList}
                  priority={priority}
                />
              ) : null}
            </div>
          </div>
          <div className="todo-toolbar-con">
            <div className="todo-toolbar-deadline">
              <p>Deadline</p>
              <img
                src="/images/icon_increase.svg"
                alt="icon increase"
                className="todo-toolbar-img"
                onClick={() => {
                  sortDeadline("Increase");
                }}
              />
              <img
                src="/images/icon_decrease.svg"
                alt="icon decrease"
                className="todo-toolbar-img"
                onClick={() => {
                  sortDeadline("Decrease");
                }}
              />
            </div>
            <div className="todo-toolbar-priority">
              <p>Priority</p>
              <img
                src="/images/icon_increase.svg"
                alt="icon increase"
                className="todo-toolbar-img"
                onClick={() => {
                  sortPriority("Increase");
                }}
              />
              <img
                src="/images/icon_decrease.svg"
                alt="icon decrease"
                className="todo-toolbar-img"
                onClick={() => {
                  sortPriority("Decrease");
                }}
              />
            </div>
            <button
              className="todo-toolbar-button button-style"
              onClick={clearAllDone}
            >
              Clear All Done
            </button>
            <button
              className="todo-toolbar-button button-style"
              onClick={() => {
                setShowAlert(true);
              }}
            >
              Clear All
            </button>
          </div>
          <div className="todo-progress-container">
            <p className="todo-progresse-text">
              {Math.floor((todolistDone.length * 100) / todolistAll.length) ||
                0}
              %
            </p>
            <div
              className="todo-progress"
              style={{
                width: `${
                  Math.floor(
                    (todolistDone.length * 100) / todolistAll.length
                  ) || 0
                }%`,
              }}
            ></div>
          </div>
          {showAlert ? (
            <Alert
              setShowAlert={setShowAlert}
              confirm={clearAll}
              message={{
                title: "Are you sure ?",
                text: "All lists will be deleted.",
              }}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
};
export default Todo;
