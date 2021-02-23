import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { removeOrRecoverPt, deletePt } from "../../../actions/backlogActions";
import {
  updatePTbutton,
  removeOrRecoverPTbutton,
  deletePTbutton,
} from "../../../buttons/PT_Buttons";
class ProjectTask extends Component {
  render() {
    const { project_task } = this.props;
    const { isDeleted } = this.props.backlog;
    let priorityString;
    let priorityClass;

    if (project_task.priority === 1) {
      priorityString = "HIGH";
      priorityClass = "bg-danger";
    } else if (project_task.priority === 2) {
      priorityString = "MEDIUM";
      priorityClass = "bg-warning";
    } else {
      priorityString = "LOW";
      priorityClass = "bg-info";
    }

    const button_removeOrRecover_color =
      isDeleted === false ? "btn-danger" : "btn-success";
    const button_removeOrRecover_text =
      isDeleted === false ? "REMOVE" : "RECOVER";

    const button_update = updatePTbutton(project_task);
    const button_removeOrRecover = removeOrRecoverPTbutton(
      button_removeOrRecover_color,
      button_removeOrRecover_text,
      project_task,
      this.props.removeOrRecoverPt,
      this.props.history
    );
    const button_delete = deletePTbutton(
      project_task,
      this.props.deletePt,
      this.props.history
    );

    const button_one =
      isDeleted === false ? button_update : button_removeOrRecover;
    const button_two =
      isDeleted === false ? button_removeOrRecover : button_delete;

    return (
      <div className="card mb-1 bg-light">
        <div className={`card-header text-primary text-light ${priorityClass}`}>
          Task ID: {project_task.projectSequence}
        </div>
        <div className="card-body bg-light">
          <h6>
            <i>Task Summary: </i>
          </h6>
          <h5 className="mb-3">{project_task.summary}</h5>
          <h6 className="mt-4">
            <i>priority: </i>
          </h6>
          <h5 className="mb-3">{priorityString}</h5>
          {project_task.acceptanceCriteria && (
            <h6 className="mt-4">
              <i>Acceptance Criteria: </i>
            </h6>
          )}
          <h5 className="mb-3 card-text text-truncate ">
            {project_task.acceptanceCriteria}
          </h5>
          {button_one}
          {button_two}
        </div>
      </div>
    );
  }
}

ProjectTask.propTypes = {
  removeOrRecoverPt: PropTypes.func.isRequired,
  deletePt: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  backlog: state.backlog,
});
export default connect(mapStateToProps, { removeOrRecoverPt, deletePt })(
  ProjectTask
);
