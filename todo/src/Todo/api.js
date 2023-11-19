import React from 'react';
import './todo.css'

export default class Api extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            todoList:[],
            activeItem:{
                id:null,
                name:'',
                date:'',
                completion_status:false,
            },
            editing:false,
        }
        this.fetchTasks = this.fetchTasks.bind(this)
    };

    fetchTasks(){
        const url = "http://127.0.0.1:8000/todo-list";
        console.log('Fetching')
        fetch(url)
        .then(response => response.json())
        .then(data => this.setState({
            todoList:data
        }))
        // .then(data => {console.log(data)})
    }

    componentWillMount(){
        this.fetchTasks();
    }

    render(){
        var tasks = this.state.todoList
        return (
            <div>
                <div>
                    <input type='text'/>
                    <button type='submit'>Add</button>
                </div>
                <div>
                <ul>
                    {tasks.map(({task, index}) => (
                        <li key={task.id} className='task-wrapper'>{task.name}</li>
                    ))}
                </ul>
                </div>
            </div>
        );
    }
}