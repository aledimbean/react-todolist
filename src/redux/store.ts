import { configureStore } from "@reduxjs/toolkit";
import todosReducer from "./todoSlice";

export const store = configureStore({
  reducer: todosReducer,
  preloadedState: loadFromLocalStorage()
});


function saveToLocalStorage(state:any) {
    try {
      const serialisedState = JSON.stringify(state);
      localStorage.setItem("todoItems", serialisedState);
    } catch (e) {
      console.warn(e);
    }
  }
  
  function loadFromLocalStorage() {
    try {
      const serialisedState = localStorage.getItem("todoItems");
      if (serialisedState === null) return undefined;
      return JSON.parse(serialisedState);
    } catch (e) {
      console.warn(e);
      return undefined;
    }
  }

store.subscribe(() => saveToLocalStorage(store.getState()));

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;