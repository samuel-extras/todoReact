import React from "react";
import "./todo-input.css";
import InputField from "./InputField";
import crypto from "crypto";

class Form extends React.Component {
  constructor() {
    super();
    this.state = {
      input: "",
      todos: [],
      display: "all",
    };
  }

  handleChange = (e) => {
    this.setState({ input: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { input, todos } = this.state;

    if (input.trim().length) {
      const id = crypto.randomBytes(16)[0];
      todos.push({ input, id, completed: false, fall: false });
      this.setState({ todos, input: "" });
    }
  };

  handleComplete = (e) => {
    const nextTodos = this.state.todos.map((todo) => {
      if (todo.id.toString() === e.target.value) {
        Object.assign(todo, { completed: !todo.completed });
      }

      return todo;
    });
    this.setState({
      todos: nextTodos,
    });
  };

  handleFall = (e) => {
    const nextTodo = this.state.todos.map((todo) => {
      if (todo.id + 1 === Number(e.target.value) + 1) {
        Object.assign(todo, { fall: true });
      }

      return todo;
    });
    this.setState({
      todos: nextTodo,
    });
  };

  handleTrash = (e) => {
    const newtodo = this.state.todos.filter((t) => t.id.toString() !== e);

    this.setState({ todos: newtodo });
  };

  fallTrash = (e) => {
    this.handleFall(e);

    let a = e.target.value;
    setTimeout(() => this.handleTrash(a), 500);
  };

  filterOption = (e) => {
    this.setState({ display: e.target.value });
  };

  todosValue = (cat) => {
    if (cat === "all") {
      return this.state.todos;
    }
    if (cat === "completed") {
      return this.state.todos.filter((t) => t.completed === true);
    }
    if (cat === "uncompleted") {
      return this.state.todos.filter((t) => t.completed !== true);
    }
    return this.state.todos;
  };

  render() {
    const { display, input } = this.state;

    return (
      <div>
        <form onSubmit={(e) => this.handleSubmit(e)} className="todo-form">
          <div className="input-button">
            <InputField
              type="text"
              value={input}
              onChange={this.handleChange}
            />
            <button className="todo-button" type="submit">
              +
            </button>
          </div>
          <div className="select-todo">
            <select
              name="todos"
              className="todo-options"
              onChange={(e) => this.filterOption(e)}
            >
              <option value="all" className="all">
                All
              </option>
              <option value="completed" className="completed">
                Completed
              </option>
              <option value="uncompleted" className="uncompleted">
                Uncompleted
              </option>
            </select>
          </div>
        </form>
        <div className="list-container">
          <div className="todo-list">
            {this.todosValue(display).map((t) => (
              <div
                key={t.id}
                id={t.fall ? "fall" : ""}
                className="todo-display"
              >
                <div className={"todo"}>
                  <span className={t.completed ? "completed" : ""}>
                    {t.input}
                  </span>
                </div>

                <button
                  className="complete-btn fa fa-check"
                  onClick={(e) => this.handleComplete(e)}
                  value={t.id}
                >
                 
                </button>
                <button
                  value={t.id}
                  onClick={(e) => this.fallTrash(e)}
                  className="trash-btn fas fa-trash"
                ></button>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default Form;
