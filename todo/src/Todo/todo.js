/* eslint-disable array-callback-return */
import React from "react";
import "./todo.css";
import DeleteIcon from "@mui/icons-material/Delete";
import { Fab } from "@mui/material";
import CachedIcon from "@mui/icons-material/Cached";
import AddIcon from "@mui/icons-material/Add";
import TextField from "@mui/material/TextField";
export default class ToDoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todoList: [],
      activeItem: {
        id: null,
        task: "",
        date: "",
        completion_status: false,
      },
      editing: false,
    };
    this.fetchTasks = this.fetchTasks.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getCookie = this.getCookie.bind(this);
    this.clearAll = this.clearAll.bind(this);
    this.clearDone = this.clearDone.bind(this);
  }

  handleChange(e) {
    this.setState({
      ...this.state,
      activeItem: {
        id: null,
        task: e.target.value,
        date: new Date().toJSON().slice(0, 10),
        completion_status: false,
      },
    });
  }

  handleClick(e, id) {
    const url = "http://127.0.0.1:8000/todo-detail/" + id;
    fetch(url).then((response) => response.json);
  }

  handleSubmit(e) {
    e.preventDefault();
    const csrftoken = this.getCookie("csrftoken");
    console.log(JSON.stringify(this.state.activeItem));
    const url = "http://127.0.0.1:8000/todo-create/";
    fetch(url, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        "X-CSRFToken": csrftoken,
      },
      body: JSON.stringify(this.state.activeItem),
    })
      .then((response) => {
        this.setState({
          ...this.state,
          activeItem: {
            id: null,
            task: "",
            date: "",
            completion_status: false,
          },
        });
      })
      .catch(function (error) {
        console.log("ERROR: ", error);
      });
  }

  changeStatus(task) {
    task.completion_status = !task.completion_status;
    var url = `http://127.0.0.1:8000/todo-update/${task.id}`;
    const csrftoken = this.getCookie("csrftoken");
    fetch(url, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
        "X-CSRFToken": csrftoken,
      },
      body: JSON.stringify(task),
    }).catch(function (error) {
      console.log("ERROR: ", error);
    });
  }

  clearAll() {
    const csrftoken = this.getCookie("csrftoken");
    this.state.todoList.map((task) => {
      fetch(`http://127.0.0.1:8000/todo-delete/${task.id}`, {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
          "X-CSRFToken": csrftoken,
        },
      });
    });
  }

  clearDone() {
    const csrftoken = this.getCookie("csrftoken");
    const updatedToDoItems = this.state.todoList.filter(
      (task) => task.completion_status
    );
    updatedToDoItems.map((task) => {
      fetch(`http://127.0.0.1:8000/todo-delete/${task.id}`, {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
          "X-CSRFToken": csrftoken,
        },
      });
    });
  }

  fetchTasks() {
    const url = "http://127.0.0.1:8000/todo-list";
    fetch(url)
      .then((response) => response.json())
      .then((data) =>
        this.setState({
          ...this.state,
          todoList: data,
        })
      );
  }

  getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== "") {
      const cookies = document.cookie.split(";");
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        // Does this cookie string begin with the name we want?
        if (cookie.substring(0, name.length + 1) === name + "=") {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
          break;
        }
      }
    }
    return cookieValue;
  }

  componentWillMount() {
    this.fetchTasks();
  }

  componentWillUpdate() {
    this.fetchTasks();
  }

  render() {
    var tasks = this.state.todoList;
    var self = this;
    return (
      <div>
        <div class="todo-heading">
          <h1>ToDo List</h1>
        </div>
        <div class="input-container">
          <form onSubmit={this.handleSubmit}>
            <TextField
              id="standard-basic"
              label="Add a Task...  "
              variant="standard"
              color="success"
              size="medium"
              sx={{ width: 350 }}
              value={this.state.activeItem.task}
              onChange={this.handleChange}
            />
            <Fab size="small" color="success" aria-label="add" type="submit">
              <AddIcon />
            </Fab>
          </form>
        </div>
        <div className="table-container">
          <table class="task-wrapper table table-borderless shadow-lg p-3 mb-5  rounded">
            <thead>
              <th scope="col">Task Name</th>
              <th scope="col">Task Date</th>
            </thead>
            <tbody>
              {tasks.map(function (task, index) {
                const completedStyle = task.completion_status
                  ? {
                      textDecoration: "line-through",
                      color: "green",
                      textDecorationThickness: "3px",
                    }
                  : {};
                return (
                  <tr
                    style={completedStyle}
                    key={index}
                    onClick={() => self.changeStatus(task)}
                  >
                    <td>{task.task}</td>
                    <td>{task.date}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div class="button-outer">
            <div class="button-inner">
              <CachedIcon onClick={this.clearAll} aria-label="reset" />
            </div>
            <div class="button-inner" aria-label="delete">
              <DeleteIcon onClick={this.clearDone} aria-label="delete" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
