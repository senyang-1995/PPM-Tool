import { Link } from "react-router-dom";

export const updatePTbutton = (project_task) => (
  <Link
    to={{
      pathname: `/updateProjectTask/${project_task.projectIdentifier}/${project_task.projectSequence}`,
    }}
    className="col-12 btn btn-primary mb-2"
  >
    VIEW / UPDATE
  </Link>
);

export const removeOrRecoverPTbutton = (
  color,
  text,
  project_task,
  removeOrRecoverPt,
  history
) => (
  <button
    className={`col-12 btn ${color} mb-2`}
    onClick={removeOrRecoverPt.bind(
      this,
      project_task.projectIdentifier,
      project_task.projectSequence,
      history
    )}
  >
    {text}
  </button>
);

export const deletePTbutton = (project_task, deletePt, history) => (
  <button
    className="col-12 btn btn-danger mb-2"
    onClick={deletePt.bind(
      this,
      project_task.projectIdentifier,
      project_task.projectSequence,
      history
    )}
  >
    <em>
      <b>
        <u>DELETE</u>
      </b>
    </em>
  </button>
);
