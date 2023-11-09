import { useDispatch } from "react-redux";
import React, { useState, useEffect } from 'react'
import { AppDispatch } from "../../redux/store";
import { updateTodo } from "../../redux/todoSlice";
import { Save, Edit2 } from 'react-feather';
import { Todo } from "../../models/Todo";
import ReactDOM from "react-dom";
import Button from "../Button/Button";

interface IProps {
    todo: Todo,
    toggleModal: (id: string) => void
}

const TodoDetail = ({todo, toggleModal}: IProps) => {
    const dispatch = useDispatch<AppDispatch>();
    const [formData, setFormData] = useState(todo);

    const handleInputChange = (e : React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    } 

    const handleSubmit = () => {
      dispatch(updateTodo(formData));
      toggleModal(todo.id);
    }

    useEffect(() => {
      const handleOutsideClick = (e: MouseEvent) => {
        if ((e.target as Element).classList.contains('backdrop')) {
           toggleModal(todo.id);
        }
      };
      document.addEventListener('click', (e) => handleOutsideClick(e));
      return () => {
        document.removeEventListener('click', (e) => handleOutsideClick(e));
      }
    }, [todo.id, toggleModal]);
    
    
    return ReactDOM.createPortal(
        <div className="backdrop justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-[8] outline-none focus:outline-none bg-black bg-opacity-40">
          <div className="relative my-6 mx-4 md:mx-auto w-full md:w-auto md:min-w-[20rem] bg-white border-0 rounded-lg shadow-lg">
            <div className="flex gap-2 items-centerw-full text-mainColor text-md border-b p-4">
              <Edit2 size={22} color="#9d164d"/><h2>Edit item</h2>
            </div>
            <div className="p-4 flex flex-col gap-3">
              <label className="flex justify-between items-center font-mono">
                Title
                <input 
                name="title"
                type="text"
                className="text-xs outline-none text-gray-900 border border-gray-300 rounded-md focus:border-none focus:bg-white focus:ring-1 focus:ring-mainColor bg-gray-50 px-2 py-1" 
                defaultValue={todo.title} 
                onChange={handleInputChange} />
              </label>
              <label className="flex flex-col gap-2 font-mono">
                Description
                <textarea
                name="description"
                rows={5}
                cols={1}
                className="text-xs outline-none text-gray-900 border border-gray-300 rounded-md focus:border-none focus:bg-white focus:ring-1 focus:ring-mainColor bg-gray-50 px-2 py-1" 
                defaultValue={todo.description} 
                onChange={handleInputChange}/>
              </label>
              <Button classes="mt-4" text="Save item" buttonStyle="primary" onClick={handleSubmit}>
                <Save color="white" width={16} className="inline ml-1" />
              </Button>
            </div>
          </div>
        </div>, document.getElementById('root') as Element
    )
}

export default TodoDetail;