import axios from "axios";
import {
  GET_ERRORS,
  GET_PROJECTS,
  GET_PROJECT,
  GET_SAVEDPROJECT,
  SHOW_DELETED_PROJECTS,
  SHOW_PROJECTS_EXCLUDE_IDENTIFIER,
} from "./types";
import url from "../config";

export const createProject = (project, history) => async (dispatch) => {
  try {
    const res = await axios.post(`${url}/api/project/`, project);
    history.push("/dashboard");
    dispatch({
      type: GET_ERRORS,
      payload: {},
    });
  } catch (err) {
    console.log(project);
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    });
  }
};

export const getProject = (projectIdentifier, history) => async (dispatch) => {
  try {
    const res = await axios.get(`${url}/api/project/${projectIdentifier}`);
    dispatch({
      type: GET_PROJECT,
      payload: res.data,
    });
    dispatch({
      type: GET_ERRORS,
      payload: {},
    });
  } catch (err) {
    history.push("/dashboard");
  }
};

export const getProjects = (showDeleted) => async (dispatch) => {
  const res = await axios.get(`${url}/api/project/all`);
  dispatch({
    type: GET_PROJECTS,
    payload: res.data,
  });
  dispatch({
    type: SHOW_DELETED_PROJECTS,
    payload: showDeleted,
  });
};

export const saveProject = (savedProject, history) => async (dispatch) => {
  dispatch({
    type: GET_SAVEDPROJECT,
    payload: savedProject,
  });
};

export const removeOrRecoverProject = (
  projectIdentifier,
  removeOrRecover
) => async (dispatch) => {
  const res = await axios.get(`${url}/api/project/${projectIdentifier}`);
  const project = res.data;
  if (removeOrRecover === "remove") {
    project.deleted = true;
  } else {
    project.deleted = false;
  }
  console.log(project);
  await axios.post(`${url}/api/project/`, project);
  dispatch({
    type: SHOW_PROJECTS_EXCLUDE_IDENTIFIER,
    payload: project.projectIdentifier,
  });
  console.log("dispatched");
};

export const deleteProject = (projectIdentifier, history) => async (
  dispatch
) => {
  if (window.confirm("Are you sure you want to delete this project?")) {
    await axios.delete(`${url}/api/project/${projectIdentifier}`);
    dispatch({
      type: SHOW_PROJECTS_EXCLUDE_IDENTIFIER,
      payload: projectIdentifier,
    });
  }
};
