import { Link } from "react-router-dom";

export const createPTbutton = (projectIdentifier) => (
  <Link
    to={`/addProjectTask/${projectIdentifier}`}
    className="col-sm-auto btn btn-lg btn-primary mr-md-2 mb-3 mb-md-0"
  >
    <i className="fas fa-plus-circle "> Create Project Task</i>
  </Link>
);

export const actionAllPTbutton = (
  action,
  color,
  text,
  symbol,
  projectIdentifier
) => (
  <button
    className={`col-sm-auto btn btn-lg ${color} ml-md-2 mb-3 mb-md-0`}
    onClick={action.bind(this, projectIdentifier)}
  >
    <i className={`fas ${symbol} `}> {text}</i>
  </button>
);

export const toPBorDeletedPBbutton = (projectIdentifier, pathname, text) => (
  <Link
    to={{
      pathname: `/${pathname}/${projectIdentifier}`,
    }}
    className="mt-md-3 mb-3 mb-md-0 ml-md-auto btn btn-lg"
  >
    <i className="pl-1">
      {""}
      {text}
      {pathname === "deletedProjectBoard" && (
        <i className="fa fa-trash  ml-2 mr-2"></i>
      )}
      <i className="fa fa-arrow-right pr-1"> </i>
    </i>
  </Link>
);
