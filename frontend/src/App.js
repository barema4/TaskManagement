import Header from "./components/Header";
import { useState, useEffect } from "react";
import { Tasks } from "./components/Tasks";
import { AddTask } from "./components/AddTask";
import { Button } from "./components/Button";

const App = () => {
  const [showAddTask, setShowAddTask] = useState(false)
  const [showEdit, setShowEdit] = useState(false)
  const [tasks, setTasks] = useState([])
  const [dateToEdit, setDateToEdit] = useState({})

  const getTasks = async(page) => {
    const taskFromServer = await fetchTasks(page)
    setTasks(taskFromServer)
  }

  useEffect(() => {
    getTasks()
  }, [])

  const fetchTasks = async(page) => {
    const res = await fetch(`http://localhost:3000/api/v1/tasks?page=${page || 1}`)
    const data = await res.json()
    return data
  }

  const addTask = async(task) => {
    await fetch('http://localhost:3000/api/v1/tasks',
    {
      method: 'POST',
      headers: {
        'Content-type':'application/json'
      },
      body: JSON.stringify(task)
    })
    getTasks()
    setShowAddTask(false)
  }

  const saveEdit = async(task) => {
    const {id, name, description} = task;
    await fetch(`http://localhost:3000/api/v1/tasks/${id}`,
    {
      method: 'PUT',
      headers: {
        'Content-type':'application/json'
      },
      body: JSON.stringify({name, description})
    })
    getTasks()
    setShowAddTask(false)
    setShowEdit(false)
  }

  const deleteTask = async(_id) => {
    await fetch(`http://localhost:3000/api/v1/tasks/${_id}`,{method: 'DELETE',})
    setTasks(tasks.filter((task) =>task._id !==_id))
    getTasks()
  }
  const onEdit = (data)=>{
    setShowAddTask(true)
    setShowEdit(true)
    setDateToEdit(data)
  }
  return (
    <div className="container">
      <Header onAdd={() => {
        setShowAddTask(!showAddTask)
        showAddTask && setShowEdit(false)
        }} showAdd={showAddTask}/>

      {showAddTask && <AddTask onAdd={addTask} saveEdit={saveEdit} dateToEdit={dateToEdit} showEdit={showEdit} /> }
      {tasks.length > 0 ? <Tasks key={tasks} tasks={tasks} onDelete={deleteTask} onEdit={onEdit} /> : 'No Task to show'}
      <div className="pagination">
        <div>
              {tasks.length > 0 && tasks[0]?.hasOwnProperty("prev") ? <Button 
                  disabled={tasks[0]?.hasOwnProperty("prev") ? false : true}
                  text="Prev"
                  onClick={() =>{
                    const prevPage = tasks[0]?.prev?.page
                    getTasks(prevPage)
              }}/> : ''}

        </div>
        <div>
            {tasks.length > 0 && tasks[0]?.hasOwnProperty("next")? <Button 
              disabled={tasks[0]?.hasOwnProperty("next") ? false : true}
              text="Next"
              onClick={() =>{
                const nextPage = tasks[0]?.next?.page
                getTasks(nextPage)
              }}/> : ''}

        </div>

      </div>
     

      
    </div>
  );
}

export default App;
