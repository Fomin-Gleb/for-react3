
import {FC, useState} from 'react'; 
import { useAppDispatch } from '../hooks';
import { addNewTodo } from '../store/todoSlice';

const TodoForm:FC=()=>{
    const [text,setText]=useState('')  
    const dispatch=useAppDispatch()

  const handleAddTodo=()=>{
    if(text.trim().length) {
        dispatch(addNewTodo(text))
        setText('')
    }
  }
    return (
        <label>
            <input type='test'
            value={text}             
            onChange={(e:React.ChangeEvent<HTMLInputElement>)=>setText(e.target.value)}
            />            
            <button onClick={handleAddTodo}>Add Todo</button>
        </label>
    )
}
export default TodoForm