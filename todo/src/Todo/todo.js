import React,{ useRef, useState } from 'react';
import './todo.css';

const ToDoItem=({ id,task,completed,ontogglecompletion }) =>{
    const completedStyle = completed ? { textDecoration: 'line-through' }: {};

    return (
        <li style={completedStyle}onClick={() => ontogglecompletion(id)}>
            {task}
        </li>
    );
};

const ToDoList =()=>{
    const [ToDoItems, settodoitems] = useState([]);
    const todoref = useRef(null);

    const HandleAddToDo=()=>{
        const new_task = {
            id:ToDoItems.length+1,
            name:(todoref.current.value).toString(),
            completed:false
        };
        let len = new_task.name.length;
        if(!new_task){
        return;
        }else if(len< 3){ 
            alert('error'); 
        }else{
            settodoitems([...ToDoItems,new_task]);
        }
    };
    const onKeyDown= event => {
        if(event.key==='Enter')HandleAddToDo();
    }
    const HandleToggleCompletion=(id)=>{
        const UpdatedToDoItems=ToDoItems.map((item)=>{
            if(item.id===id){
                return{...item,completed:!item.completed};
            }
            return item;
        });
        settodoitems(UpdatedToDoItems);
    };

return (
        <div class="headd">
            <h1>To-Do List</h1>
            <input ref={todoref} onKeyDown={onKeyDown} type="text"></input>
            <button onClick={HandleAddToDo}>Add</button>
            <ul>
                {ToDoItems.map((item)=>(
                    <ToDoItem
                        key={item.id}
                        id={item.id}
                        task={item.name}
                        completed={item.completed}
                        ontogglecompletion={HandleToggleCompletion}
                    />
                ))}
            </ul>
        </div>
    );
};

// todo item.
export default ToDoList;