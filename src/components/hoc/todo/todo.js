import React from "react";
import CompletedTasks from "../../completedTasks/completedTasks";
import AllTasks from "../../allTasks/allTasks";
import ActiveTasks from "../../activeTasks/activeTasks";
import { connect } from "react-redux";
import Wrapper from "../wrapper/wrapper";

const ToDo = (props) => {
  return (
    <Wrapper>
      {props.activePage == "active" ? (
        <ActiveTasks />
      ) : props.activePage == "completed" ? (
        <CompletedTasks />
      ) : (
        <AllTasks />
      )}
    </Wrapper>
  );
};

const mapStateToProps = (state) => {
  return {
    activePage: state.activePage,
  };
};

export default connect(mapStateToProps, null)(ToDo);
