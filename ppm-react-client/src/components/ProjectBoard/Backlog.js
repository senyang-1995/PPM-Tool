import React, { Component } from "react";
import ProjectTask from "./ProjectTasks/ProjectTask";

class Backlog extends Component {
  pt = (project_task) => {
    return <ProjectTask key={project_task.id} project_task={project_task} />;
  };
  render() {
    const { project_tasks } = this.props;
    const TO_DO = project_tasks.filter(
      (project_task) => project_task.status === "TO_DO"
    );
    const IN_PROGRESS = project_tasks.filter(
      (project_task) => project_task.status === "IN_PROGRESS"
    );
    const DONE = project_tasks.filter(
      (project_task) => project_task.status === "DONE"
    );

    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-12 col-md-4">
            <div className="card text-center mb-2">
              <div className="card-header bg-secondary text-white">
                <h3>TO DO</h3>
              </div>
            </div>
            {TO_DO.map((project_task) => this.pt(project_task))}
          </div>
          <div className="col-sm-12 col-md-4">
            <div className="card text-center mb-2">
              <div className="card-header bg-primary text-white">
                <h3>In Progress</h3>
              </div>
            </div>
            {IN_PROGRESS.map((project_task) => this.pt(project_task))}
          </div>
          <div className="col-sm-12 col-md-4">
            <div className="card text-center mb-2">
              <div className="card-header bg-success text-white">
                <h3>Done</h3>
              </div>
            </div>
            {DONE.map((project_task) => this.pt(project_task))}
          </div>
        </div>
      </div>
    );
  }
}

export default Backlog;
