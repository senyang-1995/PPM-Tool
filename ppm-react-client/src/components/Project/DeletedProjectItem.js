import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  deleteProject,
  removeOrRecoverProject,
} from "../../actions/projectActions";

class DeletedProjectItem extends Component {
  onDeleteClick = (projectIdentifier) => {
    this.props.deleteProject(projectIdentifier);
  };

  onRecoverClick = (projectIdentifier) => {
    this.props.removeOrRecoverProject(projectIdentifier, "recover");
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
                <li
                  className="list-group-item recover"
                  onClick={this.onRecoverClick.bind(
                    this,
                    project.projectIdentifier
                  )}
                >
                  <i className="fa fa-plus-circle pr-1"> Recover Project</i>
                </li>
                <li
                  className="list-group-item delete"
                  onClick={this.onDeleteClick.bind(
                    this,
                    project.projectIdentifier
                  )}
                >
                  <i className="fa fa-minus-circle pr-1"> Delete Project</i>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

DeletedProjectItem.propTypes = {
  deleteProject: PropTypes.func.isRequired,
  removeOrRecoverProject: PropTypes.func.isRequired,
};

export default connect(null, { deleteProject, removeOrRecoverProject })(
  DeletedProjectItem
);
