import TodoItem from "./TodoItem";

const TodoList = ({
  todoList,
  onItemChecked,
  onItemRemoved,
  onUpdateTodoItem,
}) => {
  const todoListValid = todoList && Array.isArray(todoList);
  const todoItemElements =
    todoListValid &&
    todoList.map((todo) => (
      <li
        key={todo.id}
        className="todolist"
      >
        <TodoItem
          {...todo}
          onItemChecked={onItemChecked}
          onItemRemoved={onItemRemoved}
          onUpdateTodoItem={onUpdateTodoItem}
        />
      </li>
    ));

  if (todoList.length === 0) {
    return <h1 className="text-center"></h1>;
  }
  return <ul className="max-w flex flex-col">{todoItemElements}</ul>;
  
};

export default TodoList;