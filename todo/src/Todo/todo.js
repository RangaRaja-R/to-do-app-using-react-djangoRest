import React,{ useRef, useState } from 'react';
import './todo.css';

const ToDoItem=({ task, ontogglecompletion }) =>{
    const completedStyle = task.completed ? { textDecoration: 'line-through' }: {};

    return (
        <tr style={completedStyle} onClick={() => ontogglecompletion(task.id)}>
            <td>{task.id}</td>
            <td style={completedStyle} >
                {task.name}
            </td>
            <td>{task.date}</td>
        </tr>
    );
};

const ToDoList =()=>{
        const [toDoItems, setToDoItems] = useState([]);
        const todoref = useRef(null);
    
        const handleAddToDo = () => {
            const today = new Date();
            const dd = String(today.getDate()).padStart(2, '0');
            const mm = String(today.getMonth() + 1).padStart(2, '0');
            const newTask = {
                id: toDoItems.length + 1,
                name: todoref.current.value.toString(),
                date: dd + '/' + mm,
                completed: false,
            };
            const len = newTask.name.length;
            if (!newTask) {
                return;
            } else if (len < 3 || len > 70) {
                alert('Task length should be between 3 and 75');
            } else {
                todoref.current.value = '';
                setToDoItems([...toDoItems, newTask]);
            }
        };
    
        const onKeyDown = event => {
            if (event.key === 'Enter') handleAddToDo();
        };
    
        const handleToggleCompletion = (id) => {
            const updateToDoItem = (item) => ({
                ...item,
                completed: item.id === id ? !item.completed : item.completed,
            });
        
            const updatedToDoItems = toDoItems.map(updateToDoItem);
            setToDoItems(updatedToDoItems);
        };

        const clearDone = () => {
            const updatedToDoItems = toDoItems.filter((toDoItem) => {
                return !toDoItem.completed;
            });
            setToDoItems(updatedToDoItems);
        };
    

return (
        <div class="to-do-list">
            <div class='alignment'>
                <div class='todo-body'>
                <div class='dots'>
                    <div class='dot'></div>
                </div>
                <div class='todo-header'></div>
                    <div class='todo-task'>
                        <div class='title'>
                            <h1 class="">To-Do List</h1>
                        </div>
                        <div class='input'>
                            <input class='form-control' id='task-input' placeholder='Add your task...' ref={todoref} onKeyDown={onKeyDown} type="text"></input>
                            <button class='btn btn-outline-secondary' onClick={handleAddToDo}>Add</button>
                        </div>
                        <table class="table">
                            <thead>
                                <th>Num</th>
                                <th class='w-50'>Task</th>
                                <th>Date</th>
                            </thead>
                            <tbody class='tasksbody'>
                                {toDoItems.map((item)=>(
                                    <ToDoItem
                                        task={item}
                                        ontogglecompletion={handleToggleCompletion}
                                    />
                                ))}
                            </tbody>
                        </table>
                        <button onClick={clearDone}>Clear</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

// todo item.
export default ToDoList;