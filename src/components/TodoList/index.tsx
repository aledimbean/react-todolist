import {useState } from 'react'
import { Edit, CheckCircle, Trash2, Save, List, Target } from 'react-feather';

// Other Imports
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { addTodo, removeTodo, completeTodo, updateTodoTitle } from "../../redux/todoSlice";


function TodoList() {
  //React Hooks
  const [todoTitle, setTodoTitle] = useState('');

  //React Redux Hooks
  const todoList = useSelector((state: RootState) => state);
  const [isOpen, setIsOpen] = useState({});
  const toggleOpen = (id:string) => {
    setIsOpen({
      ...isOpen,
      [id]: !(isOpen as any)[id],
    });
  };
  const dispatch = useDispatch<AppDispatch>();

  return (
    <div className="flex justify-center">
      <div className="w-full md:w-3/4 bg-white border rounded-xl">
        <div className="flex items-center justify-between bg-mainColor text-white py-6 px-4 rounded-t-xl">
          <h1><List size={18} color="white" className="inline mr-2"/>Agenda</h1>
          <span className="text-xs">Completed items: {todoList.filter((todo) => todo.completed).length}</span>
        </div>
        <div className="flex w-full md:w-1/2 justify-between md:justify-start gap-2 pt-6 pb-10 px-4">
          <input 
            className="w-3/4 px-4 py-2 outline-none text-gray-900 border border-gray-300 rounded-[5rem] bg-gray-50 text-md focus:ring-mainColor focus:border-mainColor" 
            type="text" 
            onChange={(e:any) => setTodoTitle(e.target.value)} 
            value={todoTitle} />
          <button 
            className="bg-mainColor text-white py-2 px-4 rounded-[5rem] text-sm" 
            onClick={() => {
            if (todoTitle !== '') {
              dispatch(addTodo(todoTitle))
              setTodoTitle('')
          }}}>Add todo</button>
          </div>
          {todoList.length > 0 && 
          <ul className="p-4">
            {
              todoList.map((todo) => (
                <div key={todo.id} className="flex items-center py-2 justify-between text-mainColor border-b-2 last:border-b-0">
                  <div className={`flex gap-2 items-center ${todo?.completed && !(isOpen as any)[todo.id] ? 'line-through' : ''}`}>
                    {/* Toggle edit mode */}
                    {(isOpen as any)[todo.id] ? 
                    <>
                      <input 
                      type="text"
                      className="outline-none text-gray-900 border border-gray-300 rounded-[5rem] focus:border-none focus:bg-white focus:ring-1 focus:ring-mainColor bg-gray-50 px-2 py-1" 
                      defaultValue={todo.title} 
                      onChange={(e) => dispatch(updateTodoTitle({ ...todo, title: e.target.value, id: todo.id }))} />
                      <Save color="#15a34a" width={20} onClick={() => toggleOpen(todo.id)} className="cursor-pointer" />
                    </> : 
                    <>
                    <h2><Target size={18} color="#b91c1b" className="inline mr-2" />{todo.title}</h2>
                    </>}
                  </div>
                  <div className="flex gap-2 items-center">
                    {!todo.completed &&
                    (<button 
                      className="bg-green-600 text-white py-1 px-4 rounded-[5rem] text-sm flex items-center" 
                      onClick={() => dispatch(completeTodo({ ...todo, completed: !todo.completed, id: todo.id }))}>
                      Mark done
                      <CheckCircle color="white" size={14} className="inline ml-2"/>
                    </button>)}
                    <Edit color="#c9c9c9" size={22} onClick={() => toggleOpen(todo.id)} className="cursor-pointer"/>
                    <Trash2 color="#b91c1b" size={22} className="cursor-pointer" onClick={() => dispatch(removeTodo(todo.id))} />
                  </div>
                </div>
              ))
            }
          </ul>
        }
      </div>
    </div>
  )
}

export default TodoList
