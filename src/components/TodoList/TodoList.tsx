import { List } from 'react-feather';

// Other Imports
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import TodoForm from "../TodoForm/TodoForm";
import TodoItem from "../TodoItem/TodoItem";


export default function TodoList() {

  //React Redux Hooks
  const todoList = useSelector((state: RootState) => state.todos);

  return (
    <div className="flex justify-center">
      <div className="w-full md:w-1/2 bg-white border rounded-xl">
        <div className="flex items-center justify-between bg-mainColor text-white py-6 px-4 rounded-t-xl">
          <h1><List size={18} color="white" className="inline mr-2"/>Agenda</h1>
          <span className="text-xs">Completed items: {todoList.filter((todo) => todo.completed).length}</span>
        </div>
          <TodoForm text="New task" />
          {todoList.length > 0 ?
          <ul className="p-4">
            {
              todoList.map((todo) => (
                <TodoItem todo={todo} key={todo.id} />
              ))
            }
          </ul>
         : null}
      </div>
    </div>
  )
}
