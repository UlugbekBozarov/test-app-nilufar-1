/* eslint-disable */
import "./App.css";
import { useState, useRef, useEffect } from "react";

const generateId = (() => {
  let count = 0;

  return () => {
    return ++count;
  };
})();

/**
 * This is a todo app with multiple bugs and badly written lines.
 * Can you fix these bugs and make code follow good practices?
 * В этом коде есть несколько багов и гавнокода, ты можешь это исправить?
 * Можно воспользоватся кодсандбоксом для исправления кода: https://codesandbox.io/s/new?file=/src/App.js:0-1806
 */

export default function App() {

  const [todos, changeTodos] = useState([]);
  const [value, changeValue] = useState("");

  const inputRef = useRef('foo');

  const addTodo = (event) => {
    event.preventDefault();
    const newTodo = {
      text: value,
      complete: false,
      id: generateId(),
    };
    let copyTodos = [...todos];
    copyTodos.push(newTodo);
    changeTodos(copyTodos);
    changeValue("");
  };

  const handleDelete = (id) => () => {
    let coptTodos = [...todos];

    let newTodos = [];
    while (coptTodos.length > 0) {
      let shiftTodos = coptTodos.shift();
      if (shiftTodos.id !== id) {
        newTodos.push(shiftTodos);
      }
    }
    changeTodos(newTodos);
  };

  const handleComplete = (index) => () => {
    let coptTodos = [...todos];
    coptTodos[index].complete = true;
    changeTodos(coptTodos);
  };

  useEffect(() => {
    // inputRef.current.focus();

    return () => changeValue("");
  }, []);

  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
      <form>
        <input
          ref={inputRef}
          value={value}
          onChange={(ev) => changeValue(ev.target.value)}
        />
        <button type="submit" onClick={addTodo}>Add</button>
      </form>
      {
        todos.map((todo, index) => (
          <li key={index}>
            {
              todo.complete ?
                <strike>{todo.text}</strike>
                :
                todo.text
            }
            <button onClick={handleComplete(index)}>complete</button>
            <button onClick={handleDelete(todo.id)}>delete</button>
          </li>
        ))
      }
    </div>
  );
}