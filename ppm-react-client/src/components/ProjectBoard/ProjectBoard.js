import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  getBackLog,
  removeAllPts,
  recoverAllPts,
  deleteAllRemovedPts,
} from "../../actions/backlogActions";
import Backlog from "./Backlog";
import {
  createPTbutton,
  toPBorDeletedPBbutton,
  actionAllPTbutton,
} from "../../buttons/PB_Buttons";
class ProjectBoard extends Component {
  componentDidMount() {
    this.props.getBackLog(
      this.props.match.params.projectIdentifier,
      this.props.history,
      this.props.isDeleted
    );
  }

  render() {
    const { projectIdentifier } = this.props.backlog;
    const { projectName } = this.props.backlog;
    const { isDeleted } = this.props;

    const button_recoverAll = actionAllPTbutton(
      this.props.recoverAllPts,
      "btn-success",
      "Recover All Project Task",
      "fa-plus-circle",
      projectIdentifier
    );

    const button_removeAll = actionAllPTbutton(
      this.props.removeAllPts,
      "btn-danger",
      "Remove All Project Task",
      "fa-minus-circle",
      projectIdentifier
    );

    const button_deteleAll = actionAllPTbutton(
      this.props.deleteAllRemovedPts,
      "btn-danger",
      "Delete All Project Task",
      "fa-minus-circle",
      projectIdentifier
    );

    const button_toDeleted = toPBorDeletedPBbutton(
      projectIdentifier,
      "deletedProjectBoard",
      "To Deleted Project "
    );

    const button_toPB = toPBorDeletedPBbutton(
      projectIdentifier,
      "projectBoard",
      "To Project Board"
    );

    const button_one =
      isDeleted === false
        ? createPTbutton(projectIdentifier)
        : button_recoverAll;

    const button_two =
      isDeleted === false ? button_removeAll : button_deteleAll;

    const button_three = isDeleted === false ? button_toDeleted : button_toPB;

    const header =
      isDeleted === false
        ? "Your Project Tasks Board"
        : "Deleted Project Tasks Board";
    return (
      <div className="container">
        <div className="row mt-5">
          <h1 className="col-12 mb-4">{header}</h1>
          <div className="col-6">
            <h6>
              <i>Project Name:</i>
            </h6>
            <h5 className="mt-2">
              {Object.keys(projectName).length === 0 ? " " : projectName}
            </h5>
          </div>
          <div className="col-6">
            <h6>
              <i>Project Identifier: </i>
            </h6>
            <h5 className="mt-2">
              {" "}
              {Object.keys(projectIdentifier).length === 0
                ? " "
                : projectIdentifier}
            </h5>
          </div>
        </div>
        <div className="container">
          <div className="row mt-5" style={{ display: "flex" }}>
            {button_one}
            {button_two}
            {button_three}
          </div>
        </div>
        <br />
        <hr />
        <Backlog project_tasks={this.props.backlog.project_tasks} />
      </div>
    );
  }
}

ProjectBoard.propTypes = {
  getBackLog: PropTypes.func.isRequired,
  removeAllPts: PropTypes.func.isRequired,
  recoverAllPts: PropTypes.func.isRequired,
  deleteAllRemovedPts: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  backlog: state.backlog,
});
export default connect(mapStateToProps, {
  getBackLog,
  removeAllPts,
  recoverAllPts,
  deleteAllRemovedPts,
})(ProjectBoard);
