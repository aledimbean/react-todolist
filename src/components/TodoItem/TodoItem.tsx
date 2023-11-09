import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { useState } from 'react'
import { removeTodo, completeTodo } from "../../redux/todoSlice";
import { Edit2, Target, Check, Trash2, RefreshCw } from 'react-feather';
import TodoDetail from "../TodoDetail/TodoDetail";
import { Todo } from "../../models/Todo";
import Button from "../Button/Button";

interface IProps {
    todo: Todo
}

const TodoItem = ({todo}: IProps) => {
    const [isOpen, setIsOpen] = useState<object|any>({});
    const toggleOpen = (id: string) => {
      setIsOpen({
        ...isOpen,
        [id]: !(isOpen)[id],
      });
    };
    const dispatch = useDispatch<AppDispatch>();
    return (
      <div key={todo.id} className="flex py-2 justify-between text-mainColor border-b-2 last:border-b-0 text-xs md:text-sm">
      <div className={`flex flex-col ${(todo.completed && !(isOpen as any)[todo.id]) ? 'line-through' : ''}`}>
        <h2 className={`text-lg ${todo.completed ? 'opacity-40' : ''}`}><Target size={18} color="#b91c1b" className="inline mr-2" />{todo.title}</h2>
        {(todo.description) ? 
        <h3 className="text-xs mt-2 ml-7 text-black opacity-80">Details: {todo.description}</h3>
        : null}
      </div>
      <div className="flex flex-col md:flex-row gap-2 md:gap-3 items-end md:items-center text-xs">
        <Edit2 color="#c9c9c9" size={20} onClick={() => toggleOpen(todo.id)} className="cursor-pointer"/>
        <Button classes="flex w-[8rem] justify-center items-center" text="Delete" buttonStyle="error" onClick={() => dispatch(removeTodo(todo.id))}>
          <Trash2 color="white" size={14} className="inline ml-1" />
         </Button>
        {!todo.completed ?
        (<Button classes="flex justify-center items-center w-[8rem] justify-center" text="Mark as done" buttonStyle="success" onClick={() => dispatch(completeTodo({ ...todo, completed: !todo.completed}))}>
          <Check color="white" size={14} className="inline ml-1"/>
         </Button>) :
        (<Button classes="flex justify-center items-center w-[8rem] justify-center" text="Redo" buttonStyle="secondary" onClick={() => dispatch(completeTodo({ ...todo, completed: !todo.completed}))}>
           <RefreshCw color="white" size={12} className="inline ml-1"/>
        </Button>)
        }
      </div>
      {(isOpen)[todo.id] ?
        <TodoDetail todo={todo} toggleModal={toggleOpen} />
      : null}
    </div>
    )
}

export default TodoItem;