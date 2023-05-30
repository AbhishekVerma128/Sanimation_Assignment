import React, { useEffect, useState } from 'react';
import "./todo.css"
function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  useEffect(() => {
    fetch('http://localhost/backend/app.php')
      .then((response) => response.json())
      .then((data) => {setTodos(data);console.log(data);});
  }, []);

  const addTodo = () => {
    if (newTodo.trim() !== '') {
      fetch('http://localhost/backend/app.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ todo: newTodo }),
      })
        .then((response) => response.json())
        .then((res) => {
          console.log(res);
          setTodos(res[0]);
          setNewTodo('');
        });
    }
  };

  const deleteTodo = (id) => {
    fetch(`http://localhost/backend/app.php?id=${id}`, {
      method: 'DELETE',
    })
      .then((response) => response.json())
      .then(() => {
        const updatedTodos = todos.filter((todo) => todo.id !== id);
        setTodos(updatedTodos);
      });
  };

  return (
    <div className='container'>
      <h1>Todo App</h1>
      <div style={{marginBottom:"30px"}}>
      <input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
      />
      <button onClick={addTodo}>Add Todo</button>
      </div>
      <hr />
      <div >
      <ul>
        {todos.map((todo,index) => (
          <li key={todo.id}>
              
             
               <div className='todo-items'>
                <div style={{marginRight:"20px"}}>{index+1}</div>
                <div style={{width:"50%",textAlign:"left"}}>
                {todo.todo}
                </div>
                <button onClick={() => deleteTodo(todo.id)} className='btn'>
              Delete
            </button>
              </div>
            
          </li>
        ))}
      </ul>
      </div>
    </div>
  );
}

export default TodoApp;
