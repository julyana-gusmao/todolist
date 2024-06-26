"use client";

import flower from '@/flower.png';
import form from '@/form-img.svg';
import pencil from '@/pencil.png';
import pontinhos from '@/pontinhos.png';
import smile from '@/smile.png';
import syn from '@/syn.png';
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import "./list.css";

type Todo = {
  id: number;
  name: string;
  status: boolean;
};

function App() {
  const Todos = ({ todos }: { todos: Todo[] }) => {
    return (
      <>
      <div id="images">
        <Image src={pontinhos} alt="pontinhos" style={{ position: "fixed", top: "10px", left: "-10px" }} />
        <Image src={pontinhos} alt="pontinhos" style={{ position: "fixed", top: "300px", right: "-65px" }} />
        <Image src={smile} alt="carinha feliz" style={{ position: "fixed", bottom: "-3px", right: "-30px", width: "280px" }} />
        <Image src={flower} alt="florzinha" style={{ position: "fixed", bottom: "-55px", left: "-6px", width: "400px" }} />
        <Image src={syn} alt="forminha" style={{ position: "fixed", top: "-10px", right: "-40px", width: "180px" }} />
      </div>


      <div className='form-container'>
        <figure>
        <Image src={form} alt="div formulario"></Image>
        </figure>
        <div className='flex items-center gap-3'>
        <h1>ToDo List</h1>
        <span><Image src={pencil} alt="div formulario"></Image></span>
        </div>

        {todos.length === 0 ? (
          <span className="noTaskMessaje">Não há tarefas pendentes.</span>
        ) : (
          todos.map((todo) => {
            return (
              <ul>
                <div className='item'>
                  {/* <span className="check"> */}
                  <input type="checkbox" checked={todo.status} onChange={() => modifyStatusTodo(todo)} />
                {/* <button
                onClick={() => modifyStatusTodo(todo)}
                  className={`checkbox ${
                    todo.status ? "bg-green-500" : "bg-white"
                  }`}
                ></button> */}
                {/* </span> */}
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
              </ul>
            );
          })
        )
        } 

      </div>
      </>
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
