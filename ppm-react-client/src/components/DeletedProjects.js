import React, { Component } from "react";
import DeletedProjectItem from "./Project/DeletedProjectItem";
import PropTypes from "prop-types";
import CreateProjectButton from "./Project/CreateProjectButton";
import { getProjects } from "../actions/projectActions";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class DeletedProjects extends Component {
  componentDidMount() {
    this.props.getProjects(true);
  }

  render() {
    const { projects } = this.props.projects;
    return (
      <div className="projects">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4 text-center">DashBoard</h1>
              <br />
              <div className="row">
                <Link to="/dashboard" className="btn btn-lg btn-success">
                  <i className="fa fa-arrow-left pr-1"> Return to DashBoard</i>
                </Link>
              </div>
              <br />
              <hr />
              {projects.map((project) => (
                <DeletedProjectItem key={project.id} project={project} />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

DeletedProjects.propTypes = {
  getProjects: PropTypes.func.isRequired,
  projects: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  projects: state.projects,
});

export default connect(mapStateToProps, { getProjects })(DeletedProjects);
