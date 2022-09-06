
import React from 'react';
import TodoItem from './TodoItem';
import { TodoItemType } from '../types';

type TodoListProps={
    todos:Array<TodoItemType>
}


const TodoList=({todos}:TodoListProps):React.ReactElement=>{
 return (
    <ul>
        {todos.map((todo)=><TodoItem key={todo.id}
            {...todo} />
        )}
    </ul>
 )
}
export default TodoList