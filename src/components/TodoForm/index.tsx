import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import {useState } from 'react'
import { addTodo } from "../../redux/todoSlice";

interface ButtonText {
    text: string;
}

const TodoForm = (props: ButtonText): JSX.Element => {
    //React Hooks
    const [todoTitle, setTodoTitle] = useState('');
    const dispatch = useDispatch<AppDispatch>();
    return (
    <div className="flex w-full md:w-1/2 justify-between md:justify-start gap-1 md:gap-2 pt-6 pb-10 px-4">
        <input 
            className="flex basis-1/2 px-4 py-2 outline-none text-gray-900 border border-gray-300 rounded-[5rem] bg-gray-50 text-md focus:ring-mainColor focus:border-mainColor" 
            type="text" 
            onChange={(e:any) => setTodoTitle(e.target.value)} 
            value={todoTitle} />
        <button 
            className="bg-mainColor text-white py-2 px-4 rounded-[5rem] text-sm" 
            onClick={() => {
            if (todoTitle !== '') {
            dispatch(addTodo(todoTitle))
            setTodoTitle('')
        }}}>{props.text}</button>
      </div>
    )
}

export default TodoForm;