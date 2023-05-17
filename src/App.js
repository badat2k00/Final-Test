import { useEffect, useState } from "react";
import { v4 } from "uuid";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import "./App.css";

function App() {
  // State and hooks
  const [todoList, setTodoList] = useState([]);

  useEffect(() => {
    const todoFromLocal = localStorage.getItem("todos");
    if (todoFromLocal) {
      setTodoList(JSON.parse(todoFromLocal));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todoList));
  }, [todoList]);

  //   Functions
  const onAddTodo = (title) => {
    const newTodo = {
      id: v4(),
      title,
      isDone: false,
    };
    setTodoList((prevList) => [newTodo, ...prevList]);
  };

  const onItemChecked = (itemId) => {
    const itemIndex = todoList.findIndex(({ id }) => id === itemId);
    const newTodo = [...todoList];
    const newTodoItem = {
      ...newTodo[itemIndex],
      isDone: !newTodo[itemIndex].isDone,
    };
    newTodo[itemIndex] = newTodoItem;
    setTodoList(newTodo);
  };

  const onItemRemoved = (itemId) => {
    const newTodo = todoList.filter((item) => item.id !== itemId);
    setTodoList(newTodo);
  };

  const onUpdateTodoItem = (newValue, todoId) => {
    const updatingTodoItemIndex = todoList.findIndex(
      (todo) => todo.id === todoId
    );

    const nextTodoList = [...todoList];

    nextTodoList[updatingTodoItemIndex] = {
      ...nextTodoList[updatingTodoItemIndex],
      title: newValue,
    };

    setTodoList(nextTodoList);
  };
  const onDeleteAllItem=(itemId)=>{
    
   
  };

  return (
    <>
      <h1>#todo</h1>
      <div className="flex items-center justify-center w-screen h-screen transition-all">
        <div className="flex flex-grow items-center justify-center h-full text-gray-600 ">
          <div className="max-w-full  my-[40px] px-7 pt-10 py-10 bg-white rounded-lg  w-2/3 h-screen">
            <TodoForm onAddTodo={onAddTodo} />
            <TodoList className="todolist"
              todoList={todoList}
              onItemChecked={onItemChecked}
              onItemRemoved={onItemRemoved}
              onUpdateTodoItem={onUpdateTodoItem}
            />
            {/* <div className="flex justify-items items-center p-5  mx-[67%] w-[40%]">
             <button  className="deleteall"onclick={onDeleteAllItem}>Delete All</button>
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;