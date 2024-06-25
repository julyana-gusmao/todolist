"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";

type Todo = {
  id: number;
  name: string;
  status: boolean;
};

function App() {
  const Todos = ({ todos }: { todos: Todo[] }) => {
    return (
      <div className="todos">
        {todos.map((todo) => {
          return (
            <div className="todo">
              <button
              onClick={() => modifyStatusTodo(todo)}
                className={`checkbox ${
                  todo.status ? "bg-green-500" : "bg-white"
                }`}
              ></button>
              <p className={`${
                  todo.status ? "line-through" : ""
                }`}>{todo.name}</p>
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

  async function handleWithNewButton() {
    setInputVisibility(!inputVisibility);
  }

  async function handleWithEditButtonClick(todo: Todo) {
    setSelectedTodo(todo);
    setInputVisibility(true);
  }


  async function getTodos() {
    const response = await axios.get("http://localhost:3333/todos");
    setTodos(response.data);
  }

  async function createTodo() {
    const response = await axios.post("http://localhost:3333/todos", {
      name: inputValue,
    });
    getTodos();
    setInputVisibility(!inputVisibility);
    setInputValue("");
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

  async function editTodo() {
    if (selectedTodo) {
      const response = await axios.put("http://localhost:3333/todos", {
        id: selectedTodo.id,
        name: inputValue,
      });
      setSelectedTodo(undefined);
      setInputVisibility(false);
      getTodos();
      setInputValue("");
    }
  }

  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [inputVisibility, setInputVisibility] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState({} as Todo | undefined);

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <>
      <div className="App">
        <main className="container min-w-full">
          <header className="header">
            <h1 className="text-2xl">Don't be lazzy!</h1>
          </header>
          <Todos todos={todos}></Todos>
          <input
            value={inputValue}
            onChange={(e) => { setInputValue(e.target.value)}}
            className="inputName"
            style={{ display: inputVisibility ? "block" : "none" }}
          ></input>
          <button
          onClick={
            inputVisibility
              ? selectedTodo
                ? editTodo
                : createTodo
              : handleWithNewButton
          }
          className="newTaskButton"
        >
          {inputVisibility ? "Confirm" : "+ New task"}
        </button>
        </main>
      </div>
    </>
  );
}

export default App;
