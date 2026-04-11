import React, { useState } from 'react'
import axios from 'axios'

const API = "http://localhost:3001";

function Create({ refreshTodos }) {

  const [task, setTask] = useState("")

  const handleAdd = () => {

    if (!task.trim()) return;

    axios.post(API + "/add", { task })
      .then(() => {
        setTask("")
        refreshTodos()
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

      <button onClick={handleAdd}>Add</button>
    </div>
  )
}

export default Create