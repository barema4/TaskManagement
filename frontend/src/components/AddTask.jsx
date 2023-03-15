import React, {useState} from 'react'
import { useEffect } from 'react';

export const AddTask = ({onAdd, saveEdit, dateToEdit, showEdit}) => {
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')

    useEffect(() => {
        showEdit && setName(dateToEdit.name)
        showEdit && setDescription(dateToEdit.description)
    }, [])

    const onSubmit = (e) => {
        e.preventDefault()
        if(!name){
            alert('Please add a task')
            return
        }
        if(showEdit){
            saveEdit({id: dateToEdit._id, name, description})
        } else {
            onAdd({name, description})
        }
        setName('')
        setDescription('')

    }
  return (
    <form className='add-form' onSubmit={onSubmit}>
        <div className='form-control'>
            <label>Title</label>
            <input
             type='text'
             placeholder='Add Task'

             value={name}
             onChange={(e) =>setName(e.target.value)}
             />
        </div>
        <div className='form-control'>
            <label>Description</label>
            <input 
             type='textarea'
             row={4}
             placeholder='Add Description'
             value={description}
             onChange={(e) =>setDescription(e.target.value)}
             />
        </div>

        <button type='submit' className='btn btn-block' text="Add Task">{showEdit?"Edit Task":"Add Task"}</button>
        
    </form>
  )
}
