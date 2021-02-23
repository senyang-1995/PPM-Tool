import axios from "axios";
import {
  GET_ERRORS,
  GET_PROJECTS,
  GET_PROJECT,
  GET_SAVEDPROJECT,
  SHOW_PROJECTS_EXCLUDE_IDENTIFIER,
  EMPTY_OUT_PROJECTS,
} from "./types";
import url from "../config";

export const createProject = (project, history) => async (dispatch) => {
  try {
    await axios.post(`${url}/api/project/`, project);
    history.push({
      pathname: "/dashboard",
      state: { update: true },
    });
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
    history.push({
      pathname: "/dashboard",
      state: { update: false },
    });
  }
};

export const getProjects = (isDeleted) => async (dispatch) => {
  const res = await axios.get(`${url}/api/project/all`);
  const payload = { projects: res.data, isDeleted: isDeleted };

  dispatch({
    type: GET_PROJECTS,
    payload: payload,
  });
};

export const saveProject = (savedProject, history) => async (dispatch) => {
  dispatch({
    type: GET_SAVEDPROJECT,
    payload: savedProject,
  });
};

export const removeOrRecoverProject = (projectIdentifier) => async (
  dispatch
) => {
  const res = await axios.put(
    `${url}/api/project/${projectIdentifier}/removeOrRecover`
  );
  const project = res.data;
  console.log(project);
  dispatch({
    type: SHOW_PROJECTS_EXCLUDE_IDENTIFIER,
    payload: project.projectIdentifier,
  });
  console.log("dispatched");
};

export const deleteProject = (projectIdentifier, history) => async (
  dispatch
) => {
  if (
    window.confirm("Are you sure you want to delete this project permenantly?")
  ) {
    await axios.delete(`${url}/api/project/${projectIdentifier}`);
    dispatch({
      type: SHOW_PROJECTS_EXCLUDE_IDENTIFIER,
      payload: projectIdentifier,
    });
  }
};

export const removeAllProjects = () => async (dispatch) => {
  if (
    window.confirm(
      "Are you sure you want to remove all projects? " +
        "Removed projects can be retrived from the 'removed' page"
    )
  ) {
    await axios.put(`${url}/api/project/all/remove`);
    dispatch({
      type: EMPTY_OUT_PROJECTS,
    });
  }
};
export const recoverAllProjects = () => async (dispatch) => {
  await axios.put(`${url}/api/project/all/recover`);
  dispatch({
    type: EMPTY_OUT_PROJECTS,
  });
};

export const deleteAllRemovedProjects = () => async (dispatch) => {
  if (
    window.confirm("This action will delete all removed projects permanently!")
  ) {
    await axios.delete(`${url}/api/project/all/deleted`);
    dispatch({
      type: EMPTY_OUT_PROJECTS,
    });
  }
};
