'use client'

import axios from "axios";
import { useEffect, useState } from "react";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import "./App.css";

type Todo = {
  id: number;
  name: string;
  status: boolean;
};

function App() {
  const Todos: React.FC<{ todos: Todo[] }> = ({ todos }) => {
    return (
      <div className="todos">
        {todos.map((todo) => {
          return (
            <div key={todo.id} className="todo">
              <button
                onClick={() => modifyStatusTodo(todo)}
                className="checkbox"
                style={{ backgroundColor: todo.status ? "#A879E6" : "white" }}
              ></button>
              <p>{todo.name}</p>
              <button onClick={() => handleWithEditButtonClick(todo)}>
                <AiOutlineEdit size={20} color={"#64697b"}></AiOutlineEdit>
              </button>
              <button onClick={() => deleteTodo(todo)}>
                <AiOutlineDelete size={20} color={"#64697b"}></AiOutlineDelete>
              </button>
            </div>
          );
        })}
      </div>
    );
  };

  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const [inputVisbility, setInputVisbility] = useState<boolean>(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | undefined>(undefined);

  async function handleWithNewButton() {
    console.log("fasfas");
    setInputVisbility(!inputVisbility);
  }

  async function handleWithEditButtonClick(todo: Todo) {
    setSelectedTodo(todo);
    setInputVisbility(true);
  }

  async function getTodos() {
    const response = await axios.get("http://localhost:3333/todos");
    setTodos(response.data);
    console.log(response.data);
  }

  async function editTodo() {
    if (selectedTodo) {
      const response = await axios.put("http://localhost:3333/todos", {
        id: selectedTodo.id,
        name: inputValue,
      });
      setSelectedTodo(undefined);
      setInputVisbility(false);
      getTodos();
      setInputValue("");
    }
  }

  async function deleteTodo(todo: Todo) {
    const response = await axios.delete(`http://localhost:3333/todos/${todo.id}`);
    getTodos();
  }

  async function modifyStatusTodo(todo: Todo) {
    const response = await axios.put("http://localhost:3333/todos", {
      id: todo.id,
      status: !todo.status,
    });
    getTodos();
  }

  async function createTodo() {
    const response = await axios.post("http://localhost:3333/todos", {
      name: inputValue,
    });
    getTodos();
    setInputVisbility(!inputVisbility);
    setInputValue("");
  }

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <div className="App">
      <header className="container">
        <div className="header">
          <h1>Dont be lazzy</h1>
        </div>
        <Todos todos={todos}></Todos>
        <input
          value={inputValue}
          style={{ display: inputVisbility ? "block" : "none" }}
          onChange={(event) => {
            setInputValue(event.target.value);
          }}
          className="inputName"
        ></input>
        <button
          onClick={
            inputVisbility
              ? selectedTodo
                ? editTodo
                : createTodo
              : handleWithNewButton
          }
          className="newTaskButton"
        >
          {inputVisbility ? "Confirm" : "+ New task"}
        </button>
      </header>
    </div>
  );
}

export default App;
