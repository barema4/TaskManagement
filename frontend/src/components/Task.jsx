import React from 'react'
import { FaTimes  } from 'react-icons/fa'
import {  BiEdit } from "react-icons/bi";



export const Task = ({task, onDelete, onEdit}) => {
    
  return (
    <div className='task'>
        <h3>
            {task.name}<BiEdit onClick={()=>onEdit(task)} style={{ color: 'green', cursor: 'pointer'}}/><FaTimes style={{ color: 'red', cursor: 'pointer'}} onClick={() => onDelete(task._id)}/>
        </h3>
        <p>{task.description
}</p>
    </div>
  )
}
