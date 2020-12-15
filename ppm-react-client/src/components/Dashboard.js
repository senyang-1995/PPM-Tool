import React, { Component } from "react";
import ProjectItem from "./Project/ProjectItem";
import PropTypes from "prop-types";
import CreateProjectButton from "./Project/CreateProjectButton";
import { getProjects } from "../actions/projectActions";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class Dashboard extends Component {
  componentDidMount() {
    this.props.getProjects(false);
  }

  render() {
    const { projects } = this.props.projects;
    return (
      <div className="projects">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4 text-center mt-5">
                Your Project Dashboard
              </h1>
              <div className="row mt-5">
                <div className="col-8">
                  <CreateProjectButton />
                </div>
                <Link
                  to="/deletedProjects"
                  className="btn btn-lg btn-secondary"
                >
                  <i className="fa fa-trash pr-1 ml-2 mr-2">
                    {" - - - - "}
                    Deleted Projects {" - - - - "}
                    <i className="fa fa-arrow-right pr-1"> </i>
                  </i>
                </Link>
              </div>
              <br />
              <hr />
              {projects.map((project) => (
                <ProjectItem key={project.id} project={project} />
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
  projects: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  projects: state.projects,
});

export default connect(mapStateToProps, { getProjects })(Dashboard);
