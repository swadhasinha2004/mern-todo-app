import React, { useEffect, useState } from 'react'
import Create from './Create'
import axios from 'axios'
import { BsCircleFill, BsFillCheckCircleFill, BsFillTrashFill } from 'react-icons/bs'

function Home() {

  const [todos, setTodos] = useState([])

  // Function to fetch todos
  const fetchTodos = () => {
    axios.get("https://mern-todo-app-aecd.onrender.com/get")
      .then(result => setTodos(result.data))
      .catch(err => console.log(err))
  }

  // Load todos when page loads
  useEffect(() => {
    fetchTodos()
  }, [])

  // Mark task as done
  const handleEdit = (id) => {
    axios.put("https://mern-todo-app-aecd.onrender.com/update/" + id)
      .then(() => fetchTodos())
      .catch(err => console.log(err))
  }

  // Delete task
  const handleDelete = (id) => {
    axios.delete("https://mern-todo-app-aecd.onrender.com/delete/" + id)
      .then(() => fetchTodos())
      .catch(err => console.log(err))
  }

  return (
    <div className='home'>
      <h2>Todo List</h2>

      {/* Pass refresh function to Create component */}
      <Create refreshTodos={fetchTodos} />

      <br />

      {
        todos.length === 0
          ?
          <div><h2>No Record</h2></div>
          :
          todos.map(todo => (
            <div className='task' key={todo._id}>

              <div className="checkbox" onClick={() => handleEdit(todo._id)}>
                {
                  todo.done
                    ? <BsFillCheckCircleFill className='icon' />
                    : <BsCircleFill className='icon' />
                }

                <p className={todo.done ? "line_through" : ""}>
                  {todo.task}
                </p>
              </div>

              <div>
                <span>
                  <BsFillTrashFill
                    className='icon'
                    onClick={() => handleDelete(todo._id)}
                  />
                </span>
              </div>

            </div>
          ))
      }

    </div>
  )
}

export default Home