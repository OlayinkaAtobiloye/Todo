import React from "react";
import "./wrapper.css";
import { connect } from "react-redux";

const Wrapper = (props) => (
  <React.Fragment>
    <header className="header">#todo</header>
    <nav>
      <ul className="taskCategories">
        <li
          className={
            props.activePage == "all" ? "taskCategory active" : "taskCategory"
          }
          onClick={props.setAllasActivePage}
        >
          All
        </li>
        <li
          className={
            props.activePage == "active"
              ? "taskCategory active"
              : "taskCategory"
          }
          onClick={props.setActiveasActivePage}
        >
          Active
        </li>
        <li
          className={
            props.activePage == "completed"
              ? "taskCategory active"
              : "taskCategory"
          }
          onClick={props.setCompletedasActivePage}
        >
          Completed
        </li>
      </ul>
    </nav>
    <main>{props.children}</main>
  </React.Fragment>
);

const mapStatetoProps = (state) => {
  return {
    activePage: state.activePage,
  };
};

const mapStatetoDispatch = (dispatch) => {
  return {
    setAllasActivePage: () =>
      dispatch({ type: "activePage", activePage: "all" }),
    setActiveasActivePage: () =>
      dispatch({ type: "activePage", activePage: "active" }),
    setCompletedasActivePage: () =>
      dispatch({ type: "activePage", activePage: "completed" }),
  };
};

export default connect(mapStatetoProps, mapStatetoDispatch)(Wrapper);
