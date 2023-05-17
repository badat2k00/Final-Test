import { useState } from "react";

export default function TodoForm({ onAddTodo }) {
  const [input, setInput] = useState("");

  const onInput = (e) => {
    setInput(e.target.value);
  };

  const onKeydown = (e) => {
    if (e.key === "Enter") {
      onAddNewTodo();
    }
  };

  const onAddNewTodo = () => {
    if (input.trim()) {
      onAddTodo(input);
    }
    setInput("");
  };

  return (
    <div className="todoform">
     
      <input
        value={input}
        onChange={onInput}
        onKeyDown={onKeydown}
        className="input"
        type="text"
        placeholder="add details"
      />
       <button
        className="buttonadd"
        onClick={onAddNewTodo}
        disabled={input.trim() === ""}
      >
        Add
      </button>
      
    </div>
  );
}