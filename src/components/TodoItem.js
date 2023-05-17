import { useState, useRef, useEffect } from "react";
import { FaBitbucket } from 'react-icons/fa';

export default function TodoItem({
  id,
  title,
  isDone,
  onItemChecked,
  onItemRemoved,
  onUpdateTodoItem,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [todoItemValue, setTodoItemValue] = useState(title);
  const todoInputRef = useRef(null);

  const onUpdateTitle = (e) => {
    setTodoItemValue(e.target.value);
  };

  //   Xử lý cái việc update lại todoitem
  const onUpdateTodoItemHandler = () => {
    onUpdateTodoItem(todoItemValue, id);
    setIsEditing(false);
  };

  const onChangeToEditMode = () => {
    setIsEditing(true);
    // Muốn focus vào cái thẻ input sau khi setState
    // Code như vầy sẽ bị bug => do hàm setState là hàm bất đồng bộ
    // Nó sẽ chạy sau các cái hàm đồng bộ
    // todoInputRef && todoInputRef.current.focus();
  };

  const onKeyDownHandler = (e) => {
    if (e.key === "Enter") {
      onUpdateTodoItemHandler();
    }
  };

  
  useEffect(() => {
    if (isEditing && todoInputRef) {
      todoInputRef && todoInputRef.current.focus();
    }
  }, [isEditing]);

  return (
    <>
    <div
      className={`relative flex justify-items items-center p-5 w-[60%] h-full ${
        isDone 
      }`}
    >
      <div className="flex items-center h-5">
        <input
          checked={isDone}
          onChange={() => onItemChecked(id)}
          id={id}
          type="checkbox"
          className="border-gray-200 rounded-full accent-sky-400 h-4 w-4 checkbox"
        />
      </div>

      {isEditing ? (
        <input
          value={todoItemValue}
          name={title}
          className="ml-3.5 block w-full border-white"
          onChange={onUpdateTitle}
          onBlur={onUpdateTodoItemHandler}
          onKeyPress={onKeyDownHandler}
          ref={todoInputRef}
        />
      ) : (
        <label
          htmlFor={id}
          className={`ml-3.5 block w-full text-gray-600 bg-white ${
            isDone && "line-through opacity-100"
          }`}
        >
          {title}
        </label>
      )}

      {/* <button
       
        onClick={onChangeToEditMode}
      >
        Update
      </button> */}
      
        <FaBitbucket className="w-[30px] h-[30px] cursor-pointer" onClick={() => onItemRemoved(id)}/>
       
       
    </div>
   
  </>
  );
}