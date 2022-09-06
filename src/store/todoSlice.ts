import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { TodoItemType } from "../types";

export const fetchTodos = createAsyncThunk<
  TodoItemType[],
  undefined,
  { rejectValue: string }
>("todos/fetchTodos", async function (_, { rejectWithValue }) {
  try {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/todos?_limit=15"
    );
    return response.data;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const addNewTodo = createAsyncThunk<
  TodoItemType,
  string,
  { rejectValue: string }
>("todos/addNewTod", async function (title, { rejectWithValue, dispatch }) {
  const newTodo = {
    title,
    completed: false,
  };
  try {
    const response = await axios.post(
      "https://jsonplaceholder.typicode.com/todos",
      { ...newTodo }
    );
    //   console.log(response.data);
    dispatch(addTodo(response.data));
  } catch (error) {
    return rejectWithValue(error.message);
  }
});


export const toggleStatusTodoById = createAsyncThunk<
  TodoItemType,
  string,
  { rejectValue: string; state: { todos: TodoState } }
>(
  "todos/toggleStatus",
  async function (id, { rejectWithValue, dispatch, getState }) {
    const todo = getState().todos.todos.find((todo) => todo.id === id);
    if (todo) {
      console.log(todo);
      try {
        const response = await axios.patch(
          `https://jsonplaceholder.typicode.com/todos/${id}`,
          { ...todo, completed: !todo.completed }
        );
        console.log(response);
        dispatch(toggleStatus(response.data));
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
    return rejectWithValue("no such todo list");
  }
);


export const deleteTodoById = createAsyncThunk<
  {},
  string,
  { rejectValue: string }
>("todos/deleteTodoById", async function (id, { rejectWithValue, dispatch }) {
  try {
    const response = await axios.delete(
      `https://jsonplaceholder.typicode.com/todos/${id}`
    );
    console.log(response);
    dispatch(removeTodo(id));
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

type TodoState = {
  todos: TodoItemType[];
  status: null | string;
  error: null | string;
};
const initialState: TodoState = {
  todos: [],
  status: null,
  error: null,
};

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    setAllTodos(state, action: PayloadAction<TodoItemType[]>) {
      state.todos = action.payload;
    },
    addTodo(state, action: PayloadAction<TodoItemType>) {
      state.todos = [...state.todos, action.payload];
    },
    removeTodo(state, action: PayloadAction<string>) {
      const newTodos = state.todos.filter((todo) => todo.id !== action.payload);
      state.todos = newTodos;
    },
    toggleStatus(state, action: PayloadAction<TodoItemType>) {
     
      const toggledTodo = state.todos.find(
        (todo) => todo.id === action.payload.id
      );
      if (toggledTodo) {
        toggledTodo.completed = action.payload.completed;
      }
    },
    setLoading(state, action) {
      state.status = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      // [fetchTodos.pending]:(state)=>{

      // },
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.status = "completed";
        state.todos = action.payload;
      })
      // [fetchTodos.fulfilled]:(state,action)=>{

      // },
      .addCase(fetchTodos.rejected, (state, action) => {
        state.error = action.payload;
        state.status = "rejected";
      });
    // [fetchTodos.rejected]:(state,action)=>{

    // }
  },
});

//  cоздание  асинхронных функций без createAsynkSunc
// export const getTodosAsync=()=>(dispatch)=>{
//   dispatch(setLoading('loading'))
//     try{
//         const response = axios.get(
//        "https://jsonplaceholder.typicode.com/todos?_limit=15")
//        .then(res=>{
//         dispatch(setAllTodos(res.data))
//         dispatch(setLoading('completed'))
//        })

//     }
//     catch(error){
//         console.log(error)
//         dispatch(setLoading('rejected'))
//     }
// }

// export const deleteTodoByID=function(id){
//   return (dispatch)=>{
//     dispatch(setLoading('loading'))
//      try{
//       const data= axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
//       .then(res=>{
//           console.log(res);
//       });
//       dispatch(removeTodo(id));
//       dispatch(setLoading('completed'))
//      } catch(error){
//          console.log(error)
//      }
//   }
// }

export const { addTodo, removeTodo, toggleStatus, setAllTodos, setLoading } =
  todoSlice.actions;
export default todoSlice.reducer;
