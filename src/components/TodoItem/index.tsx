import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { useState } from 'react'
import { removeTodo, completeTodo } from "../../redux/todoSlice";
import { Edit2, Target, Check, Trash2, RefreshCw } from 'react-feather';
import TodoDetail from "../TodoDetail";
import { Todo } from "../../models/Todo";

interface IProps {
    todo: Todo
}

const TodoItem = ({todo}: IProps) => {
    const [isOpen, setIsOpen] = useState({});
    const toggleOpen = (id:string) => {
      setIsOpen({
        ...isOpen,
        [id]: !(isOpen as any)[id],
      });
    };
    const dispatch = useDispatch<AppDispatch>();
    return (
      <div key={todo.id} className="flex py-2 justify-between text-mainColor border-b-2 last:border-b-0 text-xs md:text-sm">
      <div className={`flex flex-col ${(todo.completed && !(isOpen as any)[todo.id]) ? 'line-through' : ''}`}>
        <h2 className={todo.completed ? 'opacity-40' : ''}><Target size={18} color="#b91c1b" className="inline mr-2" />{todo.title}</h2>
        {(todo.description) ? 
        <span className="text-xs mt-2 ml-7 text-black opacity-80">Details: {todo.description}</span>
        : null}
      </div>
      <div className="flex flex-col md:flex-row gap-2 md:gap-3 items-end md:items-center text-xs">
        <Edit2 color="#c9c9c9" size={20} onClick={() => toggleOpen(todo.id)} className="cursor-pointer"/>
        <Trash2 color="#b91c1b" size={20} className="cursor-pointer" onClick={() => dispatch(removeTodo(todo.id))} />
        {!todo.completed ?
        (<button 
          className="w-[8rem] justify-center border border-green-600 text-white bg-green-600 rounded-md p-1 flex items-center" 
          onClick={() => dispatch(completeTodo({ ...todo, completed: !todo.completed}))}>
            Mark as done
          <Check color="white" size={14} className="inline ml-1"/>
        </button>) :
        (<button 
        className="w-[8rem] justify-center border border-[#c9c9c9] text-[#c9c9c9] rounded-md p-1 flex items-center" 
        onClick={() => dispatch(completeTodo({ ...todo, completed: !todo.completed}))}>
          Redo
        <RefreshCw color="#c9c9c9" size={12} className="inline ml-1"/>
        </button>)
        }
      </div>
      {(isOpen as any)[todo.id] ?
        <TodoDetail todo={todo} toggleModal={toggleOpen} />
      : null}
    </div>
    )
}

export default TodoItem;