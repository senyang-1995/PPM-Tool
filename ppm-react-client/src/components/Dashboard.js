import React, { Component } from "react";
import ProjectItem from "./Project/ProjectItem";
import PropTypes from "prop-types";
import {
  getProjects,
  removeAllProjects,
  recoverAllProjects,
  deleteAllRemovedProjects,
} from "../actions/projectActions";
import { connect } from "react-redux";
import {
  createButton,
  recoverAllbutton,
  deleteAllbutton,
  removeAllbutton,
  toDeletedbutton,
  toDBbutton,
} from "../buttons/DB_Buttons";

class Dashboard extends Component {
  componentDidMount() {
    this.props.getProjects(this.props.isDeleted);
  }

  render() {
    const { projects } = this.props.projects;
    const { isDeleted } = this.props;

    const header =
      isDeleted === false
        ? "Your Project Dashboard"
        : "Deleted Project Dashboard";

    const button_one =
      isDeleted === false
        ? createButton
        : recoverAllbutton(this.props.recoverAllProjects);

    const button_two =
      isDeleted === false
        ? removeAllbutton(this.props.removeAllProjects)
        : deleteAllbutton(this.props.deleteAllRemovedProjects);

    const button_three = isDeleted === false ? toDeletedbutton : toDBbutton;
    return (
      <div className="projects">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="row">
                <h1 className="col-12 mt-5">{header}</h1>
              </div>
              <div className="row mt-5" style={{ display: "flex" }}>
                {button_one}
                {button_two}
                {button_three}
              </div>
              <br />
              <hr />
              {projects.map((project) => (
                <ProjectItem
                  key={project.id}
                  project={project}
                  isDeleted={isDeleted}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
Dashboard.propTypes = {
  getProjects: PropTypes.func.isRequired,
  removeAllProjects: PropTypes.func.isRequired,
  recoverAllProjects: PropTypes.func.isRequired,
  deleteAllRemovedProjects: PropTypes.func.isRequired,
  projects: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  projects: state.projects,
  errors: state.errors,
});

export default connect(mapStateToProps, {
  getProjects,
  removeAllProjects,
  recoverAllProjects,
  deleteAllRemovedProjects,
})(Dashboard);
