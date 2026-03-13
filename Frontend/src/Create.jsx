import React, { useState } from 'react'
import axios from 'axios'

function Create({ refreshTodos }) {

  const [task, setTask] = useState("")

  const handleAdd = () => {
    axios.post("https://mern-todo-app-aecd.onrender.com/add", { task })
      .then(() => {
        setTask("")        // clear input
        refreshTodos()     // refresh todo list
      })
      .catch(err => console.log(err))
  }

  return (
    <div className='create_form'>

      <input
        type="text"
        placeholder="Enter Task"
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />

      <button type="button" onClick={handleAdd}>
        Add
      </button>

    </div>
  )
}

export default Create