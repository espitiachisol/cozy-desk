import React, { useState, useCallback, useEffect } from "react";
import useDrag from "../hooks/useDrag";
import WindowHeader from "../windowHeader/WindowHeader";
import TodoList from "./TodoList";
import "./Todo.css";
import { firestore } from "../../firebaseConfig";
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
  const [input, setInput] = useState("");
  const [listsToShow, setListsToShow] = useState("All");
  const [todolistAll, setTodolistAll] = useState([]);
  const [todolistTodo, setTodolistTodo] = useState([]);
  const [todolistDone, setTodolistDone] = useState([]);

  const curWindow = useCallback((node) => {
    if (node !== null) {
      const response = node.getBoundingClientRect();
      setStartPositon({
        x: response.x,
        y: response.y - 36,
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
    e.target.firstChild.value = "";
    let day = new Date();
    let id = "list" + day.getTime();
    let time = `${day.toLocaleDateString("en")}  ${day.toLocaleTimeString(
      "en",
      {
        hour: "2-digit",
        minute: "2-digit",
      }
    )}`;

    let data = { id: id, text: input, time: time, complete: false };
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
      setTodolistAll(checkALisToComplete);
    }
  };
  useEffect(() => {
    setTodolistTodo(todolistAll.filter((each) => !each.complete));
    setTodolistDone(todolistAll.filter((each) => each.complete));
  }, [todolistAll]);

  const displayAll = () => {
    setListsToShow("All");
  };
  const displayTodo = () => {
    setListsToShow("Todo");
  };
  const displayDone = () => {
    setListsToShow("Done");
  };
  return (
    <div
      className="todo window"
      ref={curWindow}
      style={{ top: position.y, left: position.x, zIndex: zIndex.Todo }}
      onClick={() => {
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
            <input
              type="text"
              className="add-form-input"
              onChange={(e) => {
                setInput(e.target.value);
              }}
            ></input>
            <button className="icon-plus">
              <img src="/images/icon_plus.svg" alt="icon-plus" />
            </button>
          </form>
          <div className="display-todo-container">
            <div className="labels-container">
              <div className="label-all todo-label" onClick={displayAll}>
                ALL({todolistAll.length})
              </div>
              <div className="label-todo todo-label" onClick={displayTodo}>
                TODO({todolistTodo.length})
              </div>
              <div className="label-done todo-label" onClick={displayDone}>
                DONE({todolistDone.length})
              </div>
            </div>
            <div className={`todo-label-line ${listsToShow}`}></div>
            <div className="todo-content">
              {listsToShow === "All" ? (
                <TodoList
                  lists={todolistAll}
                  checkComplete={checkComplete}
                  deleteList={deleteList}
                />
              ) : null}
              {listsToShow === "Todo" ? (
                <TodoList
                  lists={todolistTodo}
                  checkComplete={checkComplete}
                  deleteList={deleteList}
                />
              ) : null}
              {listsToShow === "Done" ? (
                <TodoList
                  lists={todolistDone}
                  checkComplete={checkComplete}
                  deleteList={deleteList}
                />
              ) : null}
            </div>
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
        </div>
      </div>
    </div>
  );
};
export default Todo;
