import './App.css';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';

import { useEffect } from 'react';
import { fetchTodos} from './store/todoSlice'
import { useAppDispatch, useAppSelector } from './hooks';


function App() {
// const {todos, error, status}=useAppSelector(store=>store.todos);
const {todos,status, error} =useAppSelector(state=>state.todos)

const dispatch=useAppDispatch()

useEffect(()=>{
    dispatch(fetchTodos())
},[dispatch])

  return (
    <div className="App">
         <TodoForm/>
         {status==='loading'&& <h2>LOADING</h2>}
         {error && <h2>something wrong, error:{error}</h2>}
         <TodoList todos={todos}/>
    </div>
  );
}

export default App;
