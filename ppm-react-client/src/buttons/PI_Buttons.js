import { Link } from "react-router-dom";

export const toPBbutton = (project) => (
  <Link
    to={{
      pathname: `/projectBoard/${project.projectIdentifier}`,
      state: { projectName: project.projectName },
    }}
  >
    <li className="list-group-item board">
      <i className="fa fa-flag-checkered pr-1 "> Project Board </i>
    </li>
  </Link>
);

export const updatePIbutton = (project) => (
  <Link to={`/updateProject/${project.projectIdentifier}`}>
    <li className="list-group-item update">
      <i className="fa fa-edit pr-1"> Update Project Info</i>
    </li>
  </Link>
);

export const removePIbutton = (action, project) => (
  <li
    className="list-group-item delete"
    onClick={action.bind(this, project.projectIdentifier)}
  >
    <i className="fa fa-minus-circle pr-1"> Remove Project</i>
  </li>
);

export const recoverPIbutton = (action, project) => (
  <li
    className="list-group-item recover"
    onClick={action.bind(this, project.projectIdentifier)}
  >
    <i className="fa fa-plus-circle pr-1"> Recover Project</i>
  </li>
);

export const deletePIbutton = (action, project) => (
  <li
    className="list-group-item delete"
    onClick={action.bind(this, project.projectIdentifier)}
  >
    <i className="fa fa-minus-circle pr-1"> Delete Project</i>
  </li>
);
