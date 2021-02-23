import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  addProjectTask,
  getProjectTask,
} from "../../../actions/backlogActions";
import classnames from "classnames";

class UpdateProjectTask extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      summary: "",
      acceptanceCriteria: "",
      status: "",
      priority: "",
      dueDate: "",
      errors: {},
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    const { projectIdentifier } = this.props.match.params;
    const { projectSequence } = this.props.match.params;
    this.props.getProjectTask(
      projectIdentifier,
      projectSequence,
      this.props.history
    );
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.errors || Object.keys(nextProps.errors).length === 0) {
      this.setState({ errors: {} });
      const projectTask = nextProps.backlog.project_task;
      this.setState(projectTask);
    } else {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    const newProjectTask = {
      id: this.state.id,
      summary: this.state.summary,
      acceptanceCriteria: this.state.acceptanceCriteria,
      status: this.state.status,
      priority: this.state.priority,
      dueDate: this.state.dueDate,
    };
    this.props.addProjectTask(
      this.props.match.params.projectIdentifier,
      newProjectTask,
      this.props.history
    );
  }

  render() {
    const { projectIdentifier } = this.props.match.params;
    const { errors } = this.state.errors === "" ? null : this.state;
    return (
      <div className="add-PBI">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link
                to={{
                  pathname: `/projectBoard/${projectIdentifier}`,
                }}
                className="btn btn-primary mb-4"
              >
                Back to Project Board
              </Link>
              <h4 className="display-4 text-center">Update Project Task</h4>
              <p className="lead text-center">
                {" "}
                Project Task Summary is required
              </p>
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <input
                    type="text"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.summary,
                    })}
                    name="summary"
                    placeholder="Project Task summary"
                    value={this.state.summary}
                    onChange={this.onChange}
                  />
                  {errors.summary && (
                    <div className="invalid-feedback">{errors.summary}</div>
                  )}
                </div>
                <div className="form-group">
                  <textarea
                    className="form-control form-control-lg"
                    placeholder="Acceptance Criteria"
                    name="acceptanceCriteria"
                    value={
                      this.state.acceptanceCriteria === null
                        ? ""
                        : this.state.acceptanceCriteria
                    }
                    onChange={this.onChange}
                  ></textarea>
                </div>
                <h6>Due Date</h6>
                <div className="form-group">
                  <input
                    type="date"
                    className="form-control form-control-lg"
                    name="dueDate"
                    value={
                      this.state.dueDate === null ? "" : this.state.dueDate
                    }
                    onChange={this.onChange}
                  />
                </div>
                <div className="form-group">
                  <select
                    className="form-control form-control-lg"
                    name="priority"
                    value={this.state.priority}
                    onChange={this.onChange}
                  >
                    <option value={0}>Select Priority</option>
                    <option value={1}>High</option>
                    <option value={2}>Medium</option>
                    <option value={3}>Low</option>
                  </select>
                </div>

                <div className="form-group">
                  <select
                    className="form-control form-control-lg"
                    name="status"
                    value={this.state.status}
                    onChange={this.onChange}
                  >
                    <option value="">Select Status</option>
                    <option value="TO_DO">TO DO</option>
                    <option value="IN_PROGRESS">IN PROGRESS</option>
                    <option value="DONE">DONE</option>
                  </select>
                </div>

                <input
                  type="submit"
                  className="btn btn-primary btn-block mt-4 mb-4"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
UpdateProjectTask.propTypes = {
  getProjectTask: PropTypes.func.isRequired,
  addProjectTask: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  backlog: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  errors: state.errors,
  backlog: state.backlog,
});

export default connect(mapStateToProps, {
  getProjectTask,
  addProjectTask,
})(UpdateProjectTask);
