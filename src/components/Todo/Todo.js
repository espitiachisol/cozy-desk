import React, { useState, useCallback, useEffect } from "react";
import useDrag from "../hooks/useDrag";
import WindowHeader from "../shared/WindowHeader/WindowHeader";
import TodoList from "./TodoList";
import TodoForm from "./TodoItems/TodoForm";
import TodoLabels from "./TodoItems/TodoLabels";
import Alert from "../shared/Alert/Alert";
import "./Todo.css";
import NoDataMessage from "../shared/NoDataMessage/NoDataMessage";
import { getYearMonthDayString } from "../../utils/helpers/time.helper";
import {
  getFirestore,
  setFirestore,
  deleteFirestore,
} from "../../api/firestore";
const converPriorityToNumber = (item) => {
  switch (item) {
    case "High":
      return 3;
    case "Medium":
      return 2;
    case "Low":
      return 1;
    default:
      return 0;
  }
};
const Todo = function ({
  setShowWindow,
  showWindow,
  zIndex,
  setZIndex,
  userState,
  setNotification,
}) {
  const [size, setSize] = useState({});
  const [startPosition, setStartPosition] = useState({});
  const [text, setText] = useState("");
  const [deadLine, setDeadLine] = useState("");
  const [priority, setPriority] = useState(null);
  const [listsToShow, setListsToShow] = useState("All");
  const [todolistAll, setTodolistAll] = useState([]);
  const [todolistTodo, setTodolistTodo] = useState([]);
  const [todolistDone, setTodolistDone] = useState([]);
  const [showAlert, setShowAlert] = useState(false);

  const curWindow = useCallback((node) => {
    if (node === null) return;
    const response = node.getBoundingClientRect();
    setStartPosition({
      x: response.x,
      y: response.y - 32,
    });
    setSize({ width: response.width, height: response.height });
  }, []);

  const [position, mouseDown] = useDrag({
    x: startPosition.x,
    y: startPosition.y,
    width: size.width,
    height: size.height,
    defaultX: parseInt(showWindow.todo.x, 10) || 20,
    defaultY: parseInt(showWindow.todo.y, 10) || 0,
  });
  useEffect(() => {
    if (userState) {
      getFirestore("todoLists", userState)
        .then((doc) => {
          if (doc.exists) {
            setTodolistAll(doc.data().todolist);
          }
        })
        .catch((error) => {
          setNotification({
            title: error?.code,
            content: error?.message,
          });
          // console.log("Error getting document:", error);
        });
    }
    return () => {
      setTodolistAll([]);
    };
  }, [userState, setNotification]);

  const addTodo = (e) => {
    e.preventDefault();
    if (text) {
      let data = {
        id: "list" + new Date().getTime(),
        text: text,
        deadLine: deadLine,
        priority: priority,
        addTime: getYearMonthDayString(),
        complete: false,
      };
      if (userState) {
        setFirestore("todoLists", userState, {
          todolist: [...todolistAll, data],
        })
          .then(() => {
            setTodolistAll([...todolistAll, data]);
          })
          .catch((error) => {
            setNotification({
              title: error?.code,
              content: error?.message,
            });
            // console.error("Error writing document: ", error);
          });
      } else {
        //使用者沒有登入的狀況
        setTodolistAll([...todolistAll, data]);
      }
      //clear form input
      e.target[0].value = ""; //text
      e.target[2].value = ""; //deadline
      e.target[3].checked = false; //audio
      e.target[4].checked = false; //audio
      e.target[5].checked = false; //audio
      setText("");
      setPriority("");
      setDeadLine("");
    } else {
      //當沒有內容時跳出注意
      setNotification({
        title: "Notification",
        content: "Todo has no content!! Please, write something!",
      });
    }
  };
  const deleteList = (listid) => {
    let filteredList = todolistAll.filter((each) => each.id !== listid);
    if (userState) {
      //登入狀態
      setFirestore("todoLists", userState, { todolist: filteredList })
        .then(() => {
          setTodolistAll(filteredList);
        })
        .catch((error) => {
          setNotification({
            title: error?.code,
            content: error?.message,
          });
          // console.error("Error writing document: ", error);
        });
    } else {
      //未登入裝態
      setTodolistAll(filteredList);
    }
  };
  const checkComplete = (listid) => {
    let newCompletedList = todolistAll.map((each) => {
      if (each.id === listid) {
        each.complete = !each.complete;
      }
      return each;
    });
    if (userState) {
      setFirestore("todoLists", userState, { todolist: newCompletedList })
        .then(() => {
          setTodolistAll(newCompletedList);
        })
        .catch((error) => {
          setNotification({
            title: error?.code,
            content: error?.message,
          });
          // console.error("Error writing document: ", error);
        });
    } else {
      //使用者沒有登入的狀況
      setTodolistAll(newCompletedList);
    }
  };

  const clearAll = () => {
    if (userState) {
      deleteFirestore("todoLists", userState)
        .then(() => {
          setTodolistAll([]);
        })
        .catch((error) => {
          setNotification({
            title: error?.code,
            content: error?.message,
          });
          // console.error("Error removing document: ", error);
        });
    } else {
      setTodolistAll([]);
    }
    setShowAlert(false);
  };
  const clearAllDone = () => {
    let filteredAllDone = todolistAll.filter((each) => each.complete !== true);
    if (userState) {
      setFirestore("todoLists", userState, { todolist: filteredAllDone })
        .then(() => {
          setTodolistAll(filteredAllDone);
        })
        .catch((error) => {
          setNotification({
            title: error?.code,
            content: error?.message,
          });
          // console.error("Error writing document: ", error);
        });
    } else {
      //使用者沒有登入的狀況
      setTodolistAll(filteredAllDone);
    }
    setShowAlert(false);
  };

  useEffect(() => {
    setTodolistTodo(todolistAll.filter((each) => !each.complete));
    setTodolistDone(todolistAll.filter((each) => each.complete));
  }, [todolistAll]);

  const sortDeadline = (label) => {
    const deadlineArray = [...todolistAll];
    let firstReturn, secondReturn;
    if (label === "Increase") {
      firstReturn = -1;
      secondReturn = 1;
    }
    if (label === "Decrease") {
      firstReturn = 1;
      secondReturn = -1;
    }
    deadlineArray.sort((listFir, listSec) => {
      listFir = Number(listFir.deadLine.replaceAll("-", ""));
      listSec = Number(listSec.deadLine.replaceAll("-", ""));
      if (listFir < listSec) {
        return firstReturn;
      }
      if (listFir > listSec) {
        return secondReturn;
      }
      return 0;
    });
    setTodolistAll(deadlineArray);
  };
  const sortPriority = (label) => {
    const priorityArray = [...todolistAll];
    let firstReturn, secondReturn;
    if (label === "Increase") {
      firstReturn = -1;
      secondReturn = 1;
    }
    if (label === "Decrease") {
      firstReturn = 1;
      secondReturn = -1;
    }
    priorityArray.sort((listFir, listSec) => {
      listFir = converPriorityToNumber(listFir.priority);
      listSec = converPriorityToNumber(listSec.priority);
      if (listFir < listSec) {
        return firstReturn;
      }
      if (listFir > listSec) {
        return secondReturn;
      }
      return 0;
    });
    setTodolistAll(priorityArray);
  };
  const witchLabelToShow = (label) => {
    setListsToShow(label);
  };
  const witchListToShow = (list) => {
    switch (list) {
      case "All":
        return todolistAll;
      case "Todo":
        return todolistTodo;
      case "Done":
        return todolistDone;
      default:
    }
  };

  return (
    <div
      className="todo window"
      ref={curWindow}
      style={{ top: position.y, left: position.x, zIndex: zIndex.todo }}
      onMouseDown={() => {
        if (zIndex.curW !== "todo") {
          setZIndex({
            ...zIndex,
            todo: zIndex.cur,
            cur: zIndex.cur + 1,
            curW: "todo",
          });
        }
      }}
    >
      <WindowHeader
        mouseDown={mouseDown}
        setShowWindow={setShowWindow}
        showWindow={showWindow}
        position={position}
        label="Todo"
      />

      <div className="todo-container-all">
        <div className="todo-container">
          <TodoForm
            addTodo={addTodo}
            setText={setText}
            setDeadLine={setDeadLine}
            setPriority={setPriority}
            priority={priority}
          />
          <div className="display-todo-container">
            <TodoLabels
              listsToShow={listsToShow}
              witchLabelToShow={witchLabelToShow}
              labelLength={{
                labelAllLength: todolistAll.length,
                labelTodoLength: todolistTodo.length,
                labelDoneLength: todolistDone.length,
              }}
            />
            <div className={`todo-label-line ${listsToShow}`}></div>
            <div className="todo-content">
              <TodoList
                lists={witchListToShow(listsToShow)}
                checkComplete={checkComplete}
                deleteList={deleteList}
                priority={priority}
              />
              {listsToShow === "All" && todolistAll.length === 0 ? (
                <NoDataMessage
                  userState={userState}
                  userMessage={{
                    title: "Your to-do is empty",
                    content:
                      "Rename your “To-Do” list to your “Opportunities” list. Add your to-do list = Add your “Opportunities” list! ☝ ✍",
                  }}
                  guestMessage={{
                    title: "Your to-do is empty",
                    content:
                      "Rename your “To-Do” list to your “Opportunities” list. Add your to-do list = Add your “Opportunities” list! ☝ ✍ ---Create an account for save your to-do list!---",
                  }}
                />
              ) : null}

              {listsToShow === "Done" && todolistDone.length === 0 ? (
                <NoDataMessage
                  userState={userState}
                  userMessage={{
                    title: "No completed to-do!",
                    content:
                      "Focusing on your to-do and take joy in check items off  your list!! ✨ ⚡",
                  }}
                  guestMessage={{
                    title: "No completed to-do",
                    content:
                      "Focusing on your to-do and take joy in check items off  your list!! ✨ ⚡ ---Create an account for save your to-do list!---",
                  }}
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
              onClick={() => {
                setShowAlert("ClearAllDone");
              }}
            >
              Clear All Done
            </button>
            <button
              className="todo-toolbar-button button-style"
              onClick={() => {
                setShowAlert("ClearAll");
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
          {showAlert === "ClearAll" ? (
            <Alert
              setShowAlert={setShowAlert}
              confirm={clearAll}
              message={{
                title: "Are you sure ?",
                text: "All lists will be deleted.",
              }}
            />
          ) : null}
          {showAlert === "ClearAllDone" ? (
            <Alert
              setShowAlert={setShowAlert}
              confirm={clearAllDone}
              message={{
                title: "Are you sure ?",
                text: "All  of your completed lists will be deleted.",
              }}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
};
export default Todo;
