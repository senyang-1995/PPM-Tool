import axios from "axios";
import url from "../config";
import {
  GET_ERRORS,
  SAVE_PROJECT_TASK,
  GET_SAVED_PROJECT_TASK,
  GET_BACKLOG,
  GET_PROJECT_TASK,
  EMPTY_OUT_PTS,
  GET_PROJECT_ID,
  GET_PROJECT_NAME,
  SHOW_PT_EXCLUDE_IDENTIFIER,
} from "./types";

export const addProjectTask = (
  projectIdentifier,
  project_task,
  history
) => async (dispatch) => {
  try {
    await axios.post(`${url}/api/backlog/${projectIdentifier}`, project_task);
    history.push({
      pathname: `/projectBoard/${projectIdentifier}`,
    });
    dispatch({
      type: GET_ERRORS,
      payload: {},
    });
  } catch (err) {
    const errMess = err.response.data;
    if (errMess.ProjectNotFound) {
      history.push(`/dashboard`);
    }
    console.log(errMess);
    dispatch({ type: GET_ERRORS, payload: errMess });
  }
};

export const updateProjectTask = (
  projectIdentifier,
  projectSequence,
  project_task,
  history
) => async (dispatch) => {
  try {
    await axios.patch(
      `${url}/api/backlog/${projectIdentifier}/${projectSequence}`,
      project_task
    );
    history.push({
      pathname: `/projectBoard/${projectIdentifier}`,
    });
    dispatch({
      type: GET_ERRORS,
      payload: {},
    });
  } catch (err) {
    const errMess = err.response.data;
    console.log(errMess);
    dispatch({ type: GET_ERRORS, payload: errMess });
  }
};

export const getBackLog = (projectIdentifier, history, isDeleted) => async (
  dispatch
) => {
  try {
    const res = await axios.get(`${url}/api/backlog/${projectIdentifier}`);
    const projectName = await (
      await axios.get(`${url}/api/project/${projectIdentifier}`)
    ).data.projectName;
    const payload = { backlog: res.data, isDeleted: isDeleted };
    dispatch({
      type: GET_ERRORS,
      payload: {},
    });
    dispatch({
      type: GET_BACKLOG,
      payload: payload,
    });
    dispatch({
      type: GET_PROJECT_ID,
      payload: projectIdentifier,
    });
    console.log(projectName);
    dispatch({
      type: GET_PROJECT_NAME,
      payload: projectName,
    });
    console.log(isDeleted);
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    });
    history.push(`/dashboard`);
  }
};

export const removeAllPts = (projectIdentifier) => async (dispatch) => {
  console.log(projectIdentifier);
  if (
    window.confirm(
      "Are you sure you want to remove all project tasks? " +
        "Removed project tasks can be retrived from the 'removed' page"
    )
  ) {
    await axios.put(`${url}/api/backlog/${projectIdentifier}/remove`);
    console.log("all pts moved to deleted");
    dispatch({
      type: EMPTY_OUT_PTS,
    });
  }
};

export const removeOrRecoverPt = (
  projectIdentifier,
  projectSequence,
  history
) => async (dispatch) => {
  console.log(projectIdentifier);
  console.log(projectSequence);
  try {
    await axios.put(
      `${url}/api/backlog/${projectIdentifier}/${projectSequence}/removeOrRecover`
    );
    dispatch({
      type: SHOW_PT_EXCLUDE_IDENTIFIER,
      payload: projectSequence,
    });
  } catch (err) {
    const errMess = err.response.data;
    if (errMess.ProjectNotFound) {
      history.push(`/dashboard`);
    } else {
      console.log(errMess);
      dispatch({ type: GET_ERRORS, payload: errMess });
    }
  }
};

export const deletePt = (projectIdentifier, projectSequence, history) => async (
  dispatch
) => {
  try {
    if (
      window.confirm("Do you want to delete this project task permenantly?")
    ) {
      await axios.delete(
        `${url}/api/backlog/${projectIdentifier}/${projectSequence}`
      );
      dispatch({
        type: SHOW_PT_EXCLUDE_IDENTIFIER,
        payload: projectSequence,
      });
    }
  } catch (err) {
    const errMess = err.response.data;
    console.log(errMess);
    if (errMess.ProjectNotFound) {
      history.push(`/dashboard`);
    } else {
      dispatch({ type: GET_ERRORS, payload: errMess });
    }
  }
};

export const recoverAllPts = (projectIdentifier) => async (dispatch) => {
  if (window.confirm("Do you want to recover all deleted project tasks?")) {
    await axios.put(`${url}/api/backlog/${projectIdentifier}/recover`);
    dispatch({
      type: EMPTY_OUT_PTS,
    });
  }
};

export const deleteAllRemovedPts = (projectIdentifier) => async (dispatch) => {
  if (
    window.confirm(
      "This action will delete all removed project tasks permanently!"
    )
  ) {
    await axios.delete(`${url}/api/backlog/${projectIdentifier}/removed`);
    dispatch({
      type: EMPTY_OUT_PTS,
    });
  }
};
export const getProjectTask = (
  projectIdentifier,
  projectSequence,
  history
) => async (dispatch) => {
  try {
    const res = await axios.get(
      `${url}/api/backlog/${projectIdentifier}/${projectSequence}`
    );
    dispatch({
      type: GET_PROJECT_TASK,
      payload: res.data,
    });
  } catch (err) {
    console.log(err.response.data);
    history.push(`/dashboard`);
  }
};

export const getSavedProjectTask = (projectIdentifier) => async (dispatch) => {
  dispatch({
    type: GET_ERRORS,
    payload: {},
  });
  dispatch({
    type: GET_SAVED_PROJECT_TASK,
    payload: projectIdentifier,
  });
};

export const saveProjectTask = (project_task) => async (dispatch) => {
  dispatch({
    type: SAVE_PROJECT_TASK,
    payload: project_task,
  });
};
