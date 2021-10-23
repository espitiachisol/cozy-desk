import React, { useState, useCallback, useEffect } from "react";
import useDrag from "../hooks/useDrag";
import WindowHeader from "../shared/WindowHeader/WindowHeader";
import TodoList from "./TodoList";
import TodoForm from "./TodoItems/TodoForm";
import TodoLabels from "./TodoItems/TodoLabels";
import "./Todo.css";
import Alert from "../shared/Alert/Alert";
import { firestore } from "../../firebaseConfig";

import NoDataMessage from "../shared/NoDataMessage/NoDataMessage";
import { getYearMonthDayString } from "../../utils/helpers/time.helper";
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
    defaultX: parseInt(showWindow.Todo.x, 10) || 20,
    defaultY: parseInt(showWindow.Todo.y, 10) || 0,
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
            // console.log("Document data:", doc.data());
            setTodolistAll(doc.data().todolist);
          } else {
            // console.log("No such document!");
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
        firestore
          .collection("todoLists")
          .doc(userState)
          .set({ todolist: [...todolistAll, data] })
          .then(() => {
            setTodolistAll([...todolistAll, data]);
          })
          .catch((error) => {
            setNotification({
              title: error?.code,
              content: error?.message,
            });
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
      //刪除的話直接用寫入覆蓋原本的array
      firestore
        .collection("todoLists")
        .doc(userState)
        .set({ todolist: filteredList })
        .then(() => {
          setTodolistAll(filteredList);
          // console.log("Document successfully updte!!!");
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
      setTodolistAll(filteredList);
    }
  };
  const checkComplete = (listid) => {
    let newCompletedList = todolistAll.map((each) =>
      each.id === listid ? (each.complete = !each.complete) : each
    );
    if (userState) {
      firestore
        .collection("todoLists")
        .doc(userState)
        .set({ todolist: newCompletedList })
        .then(() => {
          setTodolistAll(newCompletedList);
          // console.log("Document successfully updte!!!");
        })
        .catch((error) => {
          setNotification({
            title: error?.code,
            content: error?.message,
          });
          console.error("Error writing document: ", error);
        });
    } else {
      //使用者沒有登入的狀況
      setTodolistAll(newCompletedList);
    }
  };
  const clearAll = () => {
    if (userState) {
      firestore
        .collection("todoLists")
        .doc(userState)
        .delete()
        .then(() => {
          setTodolistAll([]);
        })
        .catch((error) => {
          setNotification({
            title: error?.code,
            content: error?.message,
          });
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
          // console.log("Document successfully updte!!!");
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
    setTodolistAllShow(todolistAll);
  }, [todolistAll]);
  useEffect(() => {
    setTodolistTodo(todolistAllShow.filter((each) => !each.complete));
    setTodolistDone(todolistAllShow.filter((each) => each.complete));
  }, [todolistAllShow]);
  const witchLabelToShow = (label) => {
    setListsToShow(label);
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
    // console.log(priorityArray);
    setTodolistAllShow(priorityArray);
  };
  const witchListToShow = (list) => {
    switch (list) {
      case "All":
        return todolistAllShow;
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
              {listsToShow === "All" && todolistAllShow.length === 0 ? (
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
