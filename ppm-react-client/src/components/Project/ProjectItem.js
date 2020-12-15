import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { removeOrRecoverProject } from "../../actions/projectActions";

class ProjectItem extends Component {
  onRemoveClick = (projectIdentifier) => {
    this.props.removeOrRecoverProject(projectIdentifier, "remove");
  };

  render() {
    const { project } = this.props;
    return (
      <div className="container">
        <div className="card card-body bg-light mb-3">
          <div className="row">
            <div className="col-8">
              <div className="row">
                <div className="col-6">
                  <h6>Unique Identifier:</h6>
                  <h5 className="mt-1 mb-3">{project.projectIdentifier}</h5>
                </div>
                <div className="col-6">
                  <h6>Project Name:</h6>
                  <h5 className="mt-1 mb-3">{project.projectName}</h5>
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-12">
                  <h6>Project Description:</h6>
                  <p className="mt-1 mb-3">{project.description}</p>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <ul className="list-group">
                <a href="#">
                  <li className="list-group-item board">
                    <i className="fa fa-flag-checkered pr-1 ">
                      {" "}
                      Project Board{" "}
                    </i>
                  </li>
                </a>
                <Link to={`/updateProject/${project.projectIdentifier}`}>
                  <li className="list-group-item update">
                    <i className="fa fa-edit pr-1"> Update Project Info</i>
                  </li>
                </Link>
                <li
                  className="list-group-item delete"
                  onClick={this.onRemoveClick.bind(
                    this,
                    project.projectIdentifier
                  )}
                >
                  <i className="fa fa-minus-circle pr-1"> Remove Project</i>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ProjectItem.propTypes = {
  removeOrRecoverProject: PropTypes.func.isRequired,
};

export default connect(null, { removeOrRecoverProject })(ProjectItem);
