import {
  GET_PROJECTS,
  GET_PROJECT,
  GET_SAVEDPROJECT,
  SHOW_DELETED_PROJECTS,
  SHOW_PROJECTS_EXCLUDE_IDENTIFIER,
} from "../actions/types";

const initialState = {
  projects: [],
  project: {},
  savedProject: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_PROJECTS:
      return {
        ...state,
        projects: action.payload,
      };
    case GET_PROJECT:
      return {
        ...state,
        project: action.payload,
      };

    case SHOW_DELETED_PROJECTS:
      return {
        ...state,
        projects: state.projects.filter(
          (project) => project.deleted === action.payload
        ),
      };
    case SHOW_PROJECTS_EXCLUDE_IDENTIFIER:
      return {
        ...state,
        projects: state.projects.filter(
          (project) => project.projectIdentifier !== action.payload
        ),
      };
    case GET_SAVEDPROJECT:
      return {
        ...state,
        savedProject: action.payload,
      };
    default:
      return state;
  }
}
