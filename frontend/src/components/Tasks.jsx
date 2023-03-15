import React from 'react'
import { Task } from './Task'

export const Tasks = ({tasks, onDelete, onEdit}) => {
  return (
    <>
    {tasks[1].map((task) => (
        <Task key={task._id} task={task} onDelete={onDelete} onEdit={onEdit} />
    ))}
    </>
  )
}
