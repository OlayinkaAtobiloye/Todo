import React from "react";
import "./allTasks.css";
import { connect } from "react-redux";

class AllTasks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTasks: [],
      completedTasks: [],
      go: true,
    };
  }

  handleSubmit = (event) => {
    event.preventDefault();
    // console.log(event.target[0].value);
    // console.log(event.target.elements.task.value);
    // console.log(event.target.task.value);
    const activetasks = this.state.activeTasks;
    if (event.target.task.value) {
      activetasks.push(event.target.task.value);
    }

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
    if (event.target.checked) {
      const activetasks = this.state.activeTasks;
      const doneTasks = activetasks.splice(event.target.id, 1);
      console.log(doneTasks);
      const completedTasks = this.state.completedTasks;
      this.setState(
        {
          completedTasks: [...completedTasks, doneTasks],
          activeTasks: activetasks,
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
    } else {
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
    //   localStorage.clear()
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

  render() {
    return (
      <div>
        <form className="addTask" onSubmit={this.handleSubmit.bind(this)}>
          <input placeholder="add details" className="inputTask" name="task" />
          <button type="submit" className="submitTask">
            Add
          </button>
        </form>
        {this.state.activeTasks
          ? this.state.activeTasks.map((task, index) => (
              <div key={index}>
                <input
                  type="checkbox"
                  onClick={this.handleClick.bind(this)}
                  id={index}
                />
                <p className="task">{task}</p>
              </div>
            ))
          : null}
        {this.state.completedTasks
          ? this.state.completedTasks.map((task, index) => (
              <div key={index}>
                <input
                  type="checkbox"
                  onClick={this.handleClick.bind(this)}
                  id={index}
                  checked
                />
                <p className="completedTask task">{task}</p>
              </div>
            ))
          : null}
      </div>
    );
  }
}

export default connect(null, null)(AllTasks);
