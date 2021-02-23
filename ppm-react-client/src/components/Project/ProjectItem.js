import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  removeOrRecoverProject,
  deleteProject,
} from "../../actions/projectActions";
import {
  toPBbutton,
  recoverPIbutton,
  updatePIbutton,
  removePIbutton,
  deletePIbutton,
} from "../../buttons/PI_Buttons";

class ProjectItem extends Component {
  onRemoveClick = (projectIdentifier) => {
    this.props.removeOrRecoverProject(projectIdentifier);
  };

  render() {
    const { project } = this.props;
    const { isDeleted } = this.props;
    const button_one =
      isDeleted === false
        ? toPBbutton(project)
        : recoverPIbutton(this.props.removeOrRecoverProject, project);

    const button_two =
      isDeleted === false
        ? updatePIbutton(project)
        : deletePIbutton(this.props.deleteProject, project);

    const button_three =
      isDeleted === false
        ? removePIbutton(this.props.removeOrRecoverProject, project)
        : "";

    return (
      <div className="container">
        <div className="card card-body bg-light mb-3">
          <div className="row">
            <div className="col-8">
              <div className="row">
                <div className="col-md-6">
                  <h6>Unique Identifier:</h6>
                  <h5 className="mt-1 mb-3">{project.projectIdentifier}</h5>
                </div>
                <div className="col-md-6">
                  <h6>Project Name:</h6>
                  <h5 className="mt-1 mb-3">{project.projectName}</h5>
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-auto">
                  <h6>Project Description:</h6>
                  <p className="mt-1 mb-3">{project.description}</p>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <ul className="list-group">
                {button_one}
                {button_two}
                {button_three}
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
  deleteProject: PropTypes.func.isRequired,
};

export default connect(null, { removeOrRecoverProject, deleteProject })(
  ProjectItem
);
