import React, { FC } from "react";
import { useAppDispatch } from '../hooks'
import { TodoItemType } from "../types";
import { deleteTodoById,toggleStatusTodoById } from "../store/todoSlice";

// let test:string | null='test';
// test=42

type TypeProps = {
  title: string;
};


// export type TodoImemPropsType = {
//     id: number;
//     title: string;
//     completed: boolean;
//     onClick?:(id:number)=>void

//   };
// const Title:React.FC<{title:string}>=({title})=><h1>{title}</h1>
const Title = ({ title }: TypeProps) => <h1>{title}</h1>;


const TodoItem = ({ id, title, completed }:TodoItemType) => {

  const dispatch = useAppDispatch();
  // const handleClick=(e:React.SyntheticEvent)=>{
  //   console.log(e)
  // }

//   const handleClick = (e: React.MouseEvent<HTMLSpanElement>) => {
//     console.log(e.clientX);
//   };
//   const changeInputElement = (e: React.ChangeEvent<HTMLInputElement>) => {
//     console.log(e.target);
//   };

  return (
    <li>
      {/* <Title title={title}/> */}
      <input
        type="checkbox"
        checked={completed}
        // onChange={changeInputElement}
          onChange={()=>dispatch(toggleStatusTodoById(id))}
      />
      <span>{title}</span>
      <span onClick={()=>dispatch(deleteTodoById(id))}>&#215;</span>
      {/* <span onClick={handleClick}>&#215;</span> */}
      {/* <a href="#" onClick={handleClick}>Delete</a> */}
    </li>
  );
};
export default TodoItem;
