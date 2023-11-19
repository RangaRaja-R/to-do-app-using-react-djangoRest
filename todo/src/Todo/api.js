import React from 'react';
import './todo.css'

export default class Api extends React.Component{
    
    constructor(props){
        super(props);
        this.state = {
            todoList : [],
            activeItem : {
                task:'',
                date:'',
                completion_status:false,
            },
            editing:false,
        }
        this.fetchTasks = this.fetchTasks.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    };

    handleChange(e){
        console.log(e.target.value)
        this.setState({
            ...this.state,
            activeItem:{
                task:e.target.value,
                date:new Date().toJSON().slice(0, 10),
                completion_status:false,
            }
        })
    }

    handleSubmit(e){
        e.preventDefault();
        console.log(JSON.stringify(this.state.activeItem));
        const url = 'http://127.0.0.1:8000/todo-create/'
        fetch(url, {
            method:'POST',
            headers:{
                'Content-type':'application/json',
            },
            body:JSON.stringify(this.state.activeItem)
        })
        .then(response => {
            this.fetchTasks();
            this.setState({
                ...this.state,
                activeItem:{
                    task:'',
                    date:'',
                    completion_status:false,
                }
            })
        }).catch(function(error){
            console.log('ERROR: ', error)
        })
    }

    fetchTasks(){
        const url = "http://127.0.0.1:8000/todo-list";
        fetch(url)
        .then(response => response.json())
        .then(data => (
            this.setState({
                ...this.state,
                todoList:data,
            })
        ))
    }

    componentWillMount(){
        this.fetchTasks();
    }

    render(){
        var tasks = this.state.todoList
        return (
            <div>
                <div>
                    <form onSubmit={this.handleSubmit}>
                        <input onChange={this.handleChange} type='text' ref={this.state.inputRef}/>
                        <button type='submit'>Add</button>
                    </form>
                </div>
                <div>
                    <div>
                        {tasks.map(function(task, index){
                            return(
                                <div key={index} className='task-wrapper'>
                                    <span>{task.task}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        );
    }
}