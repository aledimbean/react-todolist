import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Todo } from "../models/Todo";
import { v4 as uuidv4 } from "uuid";

const todoSlice = createSlice({
  name: 'todos',
  initialState: [] as Todo[],
  reducers: {
    addTodo: {
      reducer: (state, action: PayloadAction<Todo>) => {
        state.push(action.payload);
      },
      prepare: (title :string) => ({
        payload : {
          id: uuidv4(),
          title,
          completed: false
        } as Todo
      })
    },
    updateTodoTitle(
      state,
      action: PayloadAction<Todo>
    ){
      // Find todo item by id
      const index = state.findIndex((todo) => todo.id === action.payload.id);
      const updatedState = [...state];
      updatedState[index].title = action.payload.title;
      updatedState[index].description = action.payload.description;
    },
    completeTodo(
      state,
      action: PayloadAction<Todo>
    ) {
      const index = state.findIndex((todo) => todo.id === action.payload.id);
      state[index].completed = action.payload.completed; 
    },
    removeTodo(state, action: PayloadAction<string>) {
      const index = state.findIndex((todo) => todo.id === action.payload);
      state.splice(index, 1);
    },
  },
});

export const { addTodo, removeTodo, updateTodoTitle, completeTodo } = todoSlice.actions;
export default todoSlice.reducer;