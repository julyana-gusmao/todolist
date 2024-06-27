"use client";

<<<<<<< HEAD
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
=======
import background from "@/background-mobile.svg"
import flower from "@/flower.png";
import form from "@/form-img.svg";
import pencil from "@/pencil.png";
import pontinhos from "@/pontinhos.png";
import smile from "@/smile.png";
import syn from "@/syn.png";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import { BiPencil } from "react-icons/bi";
>>>>>>> 3e1faac9e8619959d1e2a019ffc7af0a21aa975a

type Todo = {
  id: string;
  name: string;
  status: boolean;
};

function App() {
<<<<<<< HEAD
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
=======
  const isMobile = window.innerWidth <= 1024;
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [inputVisibility, setInputVisibility] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | undefined>(undefined);
>>>>>>> 3e1faac9e8619959d1e2a019ffc7af0a21aa975a

  // Read
  const getTodos = async () => {
    const response = await axios.get("http://localhost:3333/todos");
    setTodos(response.data);
  };

  // Create
  const createTodo = async () => {
    await axios.post("http://localhost:3333/todos", {
      name: inputValue,
    });
    getTodos();
    setInputVisibility(false);
    setInputValue("");
  };

  // Update
  const editTodo = async () => {
    if (selectedTodo) {
      await axios.put("http://localhost:3333/todos", {
        id: selectedTodo.id,
        name: inputValue,
      });
      setSelectedTodo(undefined);
      setInputVisibility(false);
      getTodos();
      setInputValue("");
    }
  };

  // Delete
  const deleteTodo = async (todo: Todo) => {
    await axios.delete(`http://localhost:3333/todos/${todo.id}`);
    getTodos();
  };

  // Modify Status
  const modifyStatusTodo = async (todo: Todo) => {
    await axios.put("http://localhost:3333/todos", {
      id: todo.id,
      status: !todo.status,
    });
    setTodos((prevTodos) =>
      prevTodos.map((t) => (t.id === todo.id ? { ...t, status: !t.status } : t))
    );
  };

  const handleWithNewButton = () => {
    setInputVisibility(!inputVisibility);
  };

  const handleWithEditButtonClick = (todo: Todo) => {
    setSelectedTodo(todo);
    setInputVisibility(true);
  };

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <div>
      <main className={'container min-w-full'}>
        {isMobile && <div 
        className="block lg:hidden absolute inset-0 bg-cover bg-no-repeat"
        style={{
          backgroundImage: `url(${background.src})`,
          backgroundPosition: "center bottom",
        }}
        >
        </div>}
        <div id="images">
          <Image
            src={pontinhos}
            alt="pontinhos"
            style={{ position: "fixed", top: "10px", left: "-10px" }}
          />
          <Image
            src={pontinhos}
            alt="pontinhos"
            style={{
              position: "fixed",
              top: "200px",
              right: "-65px",
              width: "260px",
            }}
          />
          <Image
            src={smile}
            alt="carinha feliz"
            style={{
              position: "fixed",
              bottom: "-25px",
              right: "-30px",
              width: "280px",
            }}
          />
          <Image
            src={flower}
            alt="florzinha"
            style={{
              position: "fixed",
              bottom: "-55px",
              left: "-6px",
              width: "400px",
            }}
          />
          <Image
            src={syn}
            alt="forminha"
            style={{
              position: "fixed",
              top: "-20px",
              right: "-40px",
              width: "180px",
            }}
          />
        </div>

        <div className="form-container">
          <figure>
            <Image src={form} alt="div formulario" />
          </figure>
          <div className="flex items-center gap-3">
            <h1>ToDo List</h1>
            <span>
              <Image src={pencil} alt="div formulario" />
            </span>
          </div>

          {todos.length === 0 ? (
            <span className="noTaskMessage">Não há tarefas pendentes.</span>
          ) : (
            <ul>
              {todos.map((todo) => (
                <li key={todo.id} className="item">
                  <span className="check">
                    <input
                      type="checkbox"
                      id={todo.id}
                      checked={todo.status}
                      onChange={() => modifyStatusTodo(todo)}
                    />
                    <label htmlFor={todo.id}></label>
                  </span>
                  <p className={todo.status ? "taskCompleted" : ""}>
                    {todo.name}
                  </p>
                  <div className="container-div">
                    <BiPencil
                      color="#FFFFFF"
                      onClick={() => handleWithEditButtonClick(todo)}
                    />
                    <button
                      className="close-x"
                      onClick={() => deleteTodo(todo)}
                    />
                  </div>
                </li>
              ))}
            </ul>
          )}

          <div className="add-form">
            <input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="inputName"
              placeholder="Adicione uma nova tarefa"
              style={{ display: inputVisibility ? "block" : "none" }}
            />
            <button
              onClick={
                inputVisibility
                  ? selectedTodo
                    ? editTodo
                    : createTodo
                  : handleWithNewButton
              }
            >
              {inputVisibility ? "Confirmar" : "+ Nova Tarefa"}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
