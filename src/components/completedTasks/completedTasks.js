import React from "react";
import "./completedTasks.css";

class CompletedTasks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTasks: [],
      completedTasks: [],
    };
  }

  handleSubmit = (event) => {
    event.preventDefault();
    console.log(this.state.activeTasks);
    const activetasks = this.state.activeTasks;
    console.log(activetasks);
    activetasks.push(event.target.task.value);

    this.setState(
      {
        activeTasks: activetasks,
      },
      () => {
        localStorage.setItem(
          "activeTasks",
          JSON.stringify(this.state.activeTasks)
        );
      }
    );
  };

  handleClick = (event) => {
    event.preventDefault();
    if (!event.target.checked) {
      const activetasks = this.state.activeTasks;
      const completedTasks = this.state.completedTasks;
      const reactiveTasks = completedTasks.splice(event.target.id, 1);
      this.setState(
        {
          completedTasks: completedTasks,
          activeTasks: [...activetasks, reactiveTasks],
        },
        () => {
          localStorage.setItem(
            "activeTasks",
            JSON.stringify(this.state.activeTasks)
          );
          localStorage.setItem(
            "completedTasks",
            JSON.stringify(this.state.completedTasks)
          );
        }
      );
    }
  };

  componentDidMount() {
    localStorage.getItem("activeTasks")
      ? this.setState({
          activeTasks: JSON.parse(localStorage.getItem("activeTasks")),
        })
      : this.setState({ activeTasks: [] });

    localStorage.getItem("completedTasks")
      ? this.setState({
          completedTasks: JSON.parse(localStorage.getItem("completedTasks")),
        })
      : this.setState({ completedTasks: [] });
  }

  deleteAllTask = () => {
    this.setState(
      {
        completedTasks: [],
      },
      () => {
        localStorage.setItem(
          "completedTasks",
          JSON.stringify(this.state.completedTasks)
        );
      }
    );
  };

  deleteTask = (event) => {
    const index = event.target.key;
    const completedTasks = this.state.completedTasks;
    completedTasks.splice(index, 1);
    this.setState(
      {
        completedTasks: completedTasks,
      },
      () => {
        localStorage.setItem(
          "completedTasks",
          JSON.stringify(this.state.completedTasks)
        );
      }
    );
  };

  render() {
    return (
      <div className="completedDiv">
        <form className="addTask" onSubmit={this.handleSubmit.bind(this)}>
          <input placeholder="add details" className="inputTask" name="task" />
          <button type="submit" className="submitTask">
            Add
          </button>
        </form>
        {this.state.completedTasks
          ? this.state.completedTasks.map((task, index) => (
              <div
                key={index}
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <div>
                  <input
                    type="checkbox"
                    onClick={this.handleClick.bind(this)}
                    id={index}
                    checked
                  />
                  <p className="completedTask task">{task}</p>
                </div>
                <span
                  class="material-icons"
                  key={index}
                  style={{ color: "#BDBDBD" }}
                  onClick={this.deleteTask.bind(this)}
                >
                  delete
                </span>
              </div>
            ))
          : null}
        <button className="delete" onClick={this.deleteAllTask}>
          <span class="material-icons">delete</span>delete all
        </button>
      </div>
    );
  }
}

export default CompletedTasks;
