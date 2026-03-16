import React, { useEffect, useState } from 'react'
import Create from './Create'
import axios from 'axios'
import { BsCircleFill, BsFillCheckCircleFill, BsFillTrashFill } from 'react-icons/bs'

const API = "https://mern-todo-app-aecd.onrender.com";

function Home() {

  const [todos, setTodos] = useState([])

  const fetchTodos = () => {
    axios.get(API + "/get")
      .then(result => {
        setTodos(result.data)
      })
      .catch(err => console.log(err))
  }

  useEffect(() => {
    fetchTodos()
  }, [])

  const handleEdit = (id) => {
    axios.put(API + "/update/" + id)
      .then(() => fetchTodos())
      .catch(err => console.log(err))
  }

  const handleDelete = (id) => {
    axios.delete(API + "/delete/" + id)
      .then(() => fetchTodos())
      .catch(err => console.log(err))
  }

  return (
    <div className='home'>
      <h2>Todo List</h2>

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
                <BsFillTrashFill
                  className='icon'
                  onClick={() => handleDelete(todo._id)}
                />
              </div>

            </div>
          ))
      }

    </div>
  )
}

export default Home