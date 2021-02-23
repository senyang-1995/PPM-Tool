import { Link } from "react-router-dom";

export const createButton = (
  <Link
    className="col-sm-auto btn btn-lg btn-info mr-md-2 mb-3 mb-md-0"
    to="/addProject"
  >
    <i className="fas fa-plus-circle "> Create a Project</i>{" "}
  </Link>
);

export const removeAllbutton = (removeAllProjects) => (
  <button
    className="col-sm-auto btn btn-lg btn-danger mr-md-2 mb-3 mb-md-0"
    onClick={removeAllProjects.bind(this)}
  >
    <i className="fas fa-minus-circle "> Remove All Projects</i>
  </button>
);

export const recoverAllbutton = (recoverAllProjects) => (
  <button
    className="col-sm-auto btn btn-lg btn-success mr-md-2 mb-3 mb-md-0"
    onClick={recoverAllProjects.bind(this)}
  >
    <i className="fas fa-plus-circle "> Recover All Projects </i>
  </button>
);

export const deleteAllbutton = (deleteAllRemovedProjects) => (
  <button
    className="col-sm-auto btn btn-lg btn-danger mr-md-2 mb-3 mb-md-0"
    onClick={deleteAllRemovedProjects.bind(this)}
  >
    <i className="fas fa-minus-circle "> Delete All Projects </i>
  </button>
);

export const toDeletedbutton = (
  <div className="ml-md-auto">
    <Link to="/deletedDashboard" className=" btn btn-lg">
      <i className="pl-1">
        {""}
        To Deleted Projects
        <i className="fa fa-trash  ml-2 mr-2"></i>
        <i className="fa fa-arrow-right pr-1"> </i>
      </i>
    </Link>
  </div>
);

export const toDBbutton = (
  <div className="ml-md-auto">
    <Link to="/dashboard" className=" btn btn-lg">
      <i className="pl-1">
        {""}
        To Dashboard
        <i className="fa fa-check  ml-2 mr-2"></i>
        <i className="fa fa-arrow-right pr-1"> </i>
      </i>
    </Link>
  </div>
);
